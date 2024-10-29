package net.tamasnovak.artifact.application.studentApplication.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.account.account.service.AccountService;
import net.tamasnovak.artifact.accountRole.student.entity.Student;
import net.tamasnovak.artifact.accountRole.student.service.StudentService;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationView;
import net.tamasnovak.artifact.application.studentApplication.dto.NewApplicationByStudent;
import net.tamasnovak.artifact.application.studentApplication.dto.StudentDashboardStatistics;
import net.tamasnovak.artifact.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.artifact.applicationstages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.applicationStatus.service.ApplicationStatusService;
import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationstages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstages.interviewStatus.service.InterviewStatusService;
import net.tamasnovak.artifact.applicationstages.offerStatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.offerStatus.service.OfferStatusService;
import net.tamasnovak.artifact.applicationstages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstages.responseStatus.service.ResponseStatusService;
import net.tamasnovak.artifact.applicationstages.shared.entity.BaseStatusEntity;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.service.InstitutionService;
import net.tamasnovak.artifact.support.university.entity.University;
import net.tamasnovak.artifact.support.university.service.UniversityService;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.enums.status.FinalDestinationType;
import net.tamasnovak.enums.status.ResponseStatusType;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.PdfRequestRabbitConfig;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentAccountDto;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentApplicationDto;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentPdfRequestDataQueueDto;
import net.tamasnovak.rabbitmq.service.QueueSender;
import net.tamasnovak.validation.applicationfieldvalidator.ExistingApplicationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "StudentApplicationService")
public class StudentApplicationServiceImpl implements StudentApplicationService {
  private final AccountService accountService;
  private final StudentService studentService;
  private final InstitutionService institutionService;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final ApplicationService applicationService;
  private final ApplicationStatusService applicationStatusService;
  private final InterviewStatusService interviewStatusService;
  private final OfferStatusService offerStatusService;
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;
  private final QueueSender queueSender;
  private final ApplicationRepository applicationRepository;
  private final ExistingApplicationValidator existingApplicationValidator;
  private final StudentApplicationServiceConstants serviceConstants;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public StudentApplicationServiceImpl(AccountService accountService, StudentService studentService, InstitutionService institutionService, CountryService countryService, UniversityService universityService, ApplicationService applicationService, ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, QueueSender queueSender, ApplicationRepository applicationRepository, ExistingApplicationValidator existingApplicationValidator, StudentApplicationServiceConstants serviceConstants, GlobalServiceConstants globalServiceConstants) {
    this.accountService = accountService;
    this.studentService = studentService;
    this.institutionService = institutionService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.applicationService = applicationService;
    this.applicationStatusService = applicationStatusService;
    this.interviewStatusService = interviewStatusService;
    this.offerStatusService = offerStatusService;
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
    this.queueSender = queueSender;
    this.applicationRepository = applicationRepository;
    this.existingApplicationValidator = existingApplicationValidator;
    this.serviceConstants = serviceConstants;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "AllApplicationRecordsByAccountUuid", key = "{ #accountUuid }")
  public List<ApplicationData> findApplicationDataByAccountUuid(final UUID accountUuid) {
    final List<ApplicationView> applicationViews = applicationRepository.findApplicationViewsByAccountUuid(accountUuid);

    return applicationViews.stream()
                           .map(ApplicationData::new)
                           .collect(Collectors.toList());
  }

  @Override
  @Transactional
  @Caching(evict = {
    @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #accountUuid }"),
    @CacheEvict(value = "SingleApplicationRecordByUuid", key = "{ #applicationUuid }") })
  public void toggleIsRemovableByApplicationUuid(final UUID applicationUuid, final UUID accountUuid) {
    applicationRepository.updateIsRemovableFieldByUuid(applicationUuid);
  }

  @Override
  @Transactional(readOnly = true)
  public StudentDashboardStatistics findStudentDashboardDataByAccount(final Account account) {
    final Student student = studentService.getByAccount(account);
    final String plannedApplicationName = applicationStatusService.findByName(ApplicationStatusType.PLANNED.getName())
                                                                  .getName();
    final String submittedApplicationName = applicationStatusService.findByName(ApplicationStatusType.SUBMITTED.getName())
                                                                    .getName();
    final String withdrawnApplicationName = applicationStatusService.findByName(ApplicationStatusType.WITHDRAWN.getName())
                                                                    .getName();
    final String firmChoiceName = responseStatusService.findByName(ResponseStatusType.FIRM_CHOICE.getName())
                                                       .getName();
    final String finalDestinationName = finalDestinationStatusService.findByName(FinalDestinationType.FINAL_DESTINATION.getName())
                                                                     .getName();
    final String deferredFinalDestinationName = finalDestinationStatusService.findByName(FinalDestinationType.DEFERRED_FINAL_DESTINATION.getName())
                                                                             .getName();

    return new StudentDashboardStatistics(
      student.getFirmChoiceDto(firmChoiceName),
      student.getFinalDestinationDto(finalDestinationName, deferredFinalDestinationName),
      student.getApplicationNumber(),
      student.countApplicationsByPredicate(element -> areValuesEqual(element.getApplicationStatusName(), plannedApplicationName)),
      student.countApplicationsByPredicate(element -> areValuesEqual(element.getApplicationStatusName(), submittedApplicationName)),
      student.countApplicationsByPredicate(element -> areValuesEqual(element.getApplicationStatusName(), withdrawnApplicationName)),
      student.countApplicationsByDistinctValue(Application::getCountryName),
      student.countApplicationsByDistinctValue(Application::getUniversityName),
      student.countApplicationsByPredicate(Application::isInterviewStatusNull),
      student.countApplicationsByPredicate(element -> !element.isOfferStatusNull())
    );
  }

  @Override
  @Transactional
  @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }")
  public ApplicationData createApplication(
    final Account account,
    final NewApplicationByStudent requestBody) {
    final Country country = countryService.findByUuid(UUID.fromString(requestBody.countryUuid()));
    final University university = universityService.findByUuid(UUID.fromString(requestBody.universityUuid()));
    country.verifyUniversityCountryMatch(university, serviceConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    final Student student = studentService.getByAccount(account);
    final ApplicationStatus plannedApplicationStatus = applicationStatusService.findByName("Planned");
    final Application newApplication = Application.createApplicationByStudent(
      student,
      country,
      university,
      requestBody.courseName(),
      requestBody.minorSubject(),
      requestBody.programmeLength(),
      plannedApplicationStatus
    );
    final Application savedApplication = applicationRepository.save(newApplication);

    return applicationService.fetchApplicationDataByUuid(savedApplication.getUuid());
  }

  @Override
  @Transactional
  @Caching(evict = {
    @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }"),
    @CacheEvict(value = "SingleApplicationRecordByUuid", key = "{ #uuid }") })
  public ApplicationData updateApplicationAndFetchByUuid(final UUID uuid, final UpdateApplicationByStudent requestBody, final Account account) {
    final Application currentApplication = applicationService.findByUuid(uuid);
    final Student currentStudent = studentService.getByAccount(account);
    final UUID studentUuidByApplication = currentApplication.getStudentAccountUuid();

    account.verifyAuthAccountUuidAgainstAnother(studentUuidByApplication, globalServiceConstants.NO_PERMISSION);

    final ApplicationStatus newApplicationStatus = getStatusOnUpdate(
      requestBody.applicationStatusUuid(),
      currentApplication::returnApplicationStatusIfSame,
      applicationStatusService::findByUuid);
    final InterviewStatus newInterviewStatus = getStatusOnUpdate(
      requestBody.interviewStatusUuid(),
      currentApplication::returnInterviewStatusIfSame,
      interviewStatusService::findByUuid);
    final OfferStatus newOfferStatus = getStatusOnUpdate(
      requestBody.offerStatusUuid(),
      currentApplication::returnOfferStatusIfSame,
      offerStatusService::findByUuid);
    final ResponseStatus newResponseStatus = getStatusOnUpdate(
      requestBody.responseStatusUuid(),
      currentApplication::returnResponseStatusIfSame,
      responseStatusService::findByUuid);
    final FinalDestinationStatus newFinalDestinationStatus = getStatusOnUpdate(
      requestBody.finalDestinationStatusUuid(),
      currentApplication::returnFinalDestinationStatusIfSame,
      finalDestinationStatusService::findByUuid);

    existingApplicationValidator.validateStatusFields(requestBody, currentApplication, currentStudent, newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus);

    final ResponseStatus offerDeclinedStatus = responseStatusService.findByName(ResponseStatusType.OFFER_DECLINED.getName());
    final FinalDestinationStatus notFinalDestinationStatus = finalDestinationStatusService.findByName(FinalDestinationType.NOT_FINAL_DESTINATION.getName());
    currentApplication.updateStatusFields(newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus, offerDeclinedStatus, notFinalDestinationStatus);

    applicationRepository.save(currentApplication);

    return applicationService.fetchApplicationDataByUuid(currentApplication.getUuid());
  }

  private <T extends BaseStatusEntity> T getStatusOnUpdate(
    final String bodyStatusId,
    final Function<UUID, T> checkIfStatusIsSameFn,
    final Function<UUID, T> getByUuidFn) {
    final T statusField = checkIfStatusIsSameFn.apply(UUID.fromString(bodyStatusId));

    if (!(statusField instanceof ApplicationStatus) && areValuesEqual(bodyStatusId, "")) {
      return null;
    }

    if (statusField != null) {
      return statusField;
    }

    return getByUuidFn.apply(UUID.fromString(bodyStatusId));
  }

  private boolean areValuesEqual(final String string, final String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }

  @Override
  @Transactional
  public void handleDownloadRequest(final UUID accountUuid) {
    final Account studentAccount = accountService.findAccountByUuid(accountUuid);
    final Institution studentInstitution = institutionService.findById(studentAccount.getInstitutionId());
    final List<ApplicationData> applicationData = this.findApplicationDataByAccountUuid(accountUuid);

    final StudentPdfRequestDataQueueDto compiledData = compileStudentPdfSaveData(accountUuid, studentAccount, studentInstitution, applicationData);
    queueSender.send(PdfRequestRabbitConfig.STUDENT_PDF_SAVE_EXCHANGE_KEY, PdfRequestRabbitConfig.STUDENT_PDF_SAVE_ROUTING_KEY, compiledData);
  }

  private StudentPdfRequestDataQueueDto compileStudentPdfSaveData(
    final UUID authAccountUuid,
    final Account studentAccount,
    final Institution studentInstitution,
    final List<ApplicationData> applications) {
    final StudentAccountDto accountDto = new StudentAccountDto(studentAccount.getFullName(), studentAccount.getEmail(), studentInstitution.getName());
    final List<StudentApplicationDto> applicationDtos = new ArrayList<>();

    for (ApplicationData application : applications) {
      final StudentApplicationDto applicationQueueDto = new StudentApplicationDto(
        application.createdAt(),
        application.lastUpdatedAt(),
        application.courseName(),
        application.university(),
        application.country(),
        application.applicationStatus(),
        application.interviewStatus(),
        application.offerStatus(),
        application.responseStatus(),
        application.finalDestinationStatus()
      );

      applicationDtos.add(applicationQueueDto);
    }

    return new StudentPdfRequestDataQueueDto(authAccountUuid, accountDto, applicationDtos);
  }
}
