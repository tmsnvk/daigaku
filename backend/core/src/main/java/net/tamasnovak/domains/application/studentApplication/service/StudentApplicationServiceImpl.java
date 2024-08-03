package net.tamasnovak.domains.application.studentApplication.service;

import net.tamasnovak.domains.account.account.entity.Account;
import net.tamasnovak.domains.account.account.service.AccountService;
import net.tamasnovak.domains.accountRole.student.entity.Student;
import net.tamasnovak.domains.accountRole.student.service.StudentService;
import net.tamasnovak.domains.application.application.service.ApplicationService;
import net.tamasnovak.domains.application.shared.dto.ApplicationData;
import net.tamasnovak.domains.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.domains.application.shared.persistence.ApplicationView;
import net.tamasnovak.domains.application.studentApplication.dto.NewApplicationByStudent;
import net.tamasnovak.domains.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.domains.application.studentApplication.dto.StudentDashboardData;
import net.tamasnovak.domains.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.applicationStatus.service.ApplicationStatusService;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.service.FinalDestinationStatusService;
import net.tamasnovak.domains.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.interviewStatus.service.InterviewStatusService;
import net.tamasnovak.domains.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.offerStatus.service.OfferStatusService;
import net.tamasnovak.domains.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.service.ResponseStatusService;
import net.tamasnovak.domains.applicationStages.shared.entity.BaseStatusEntity;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.domains.support.country.entity.Country;
import net.tamasnovak.domains.support.country.service.CountryService;
import net.tamasnovak.domains.support.institution.entity.Institution;
import net.tamasnovak.domains.support.institution.service.InstitutionService;
import net.tamasnovak.domains.support.university.entity.University;
import net.tamasnovak.domains.support.university.service.UniversityService;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.enums.status.FinalDestinationType;
import net.tamasnovak.enums.status.ResponseStatusType;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.PdfRequestRabbitConfig;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentAccountDto;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentApplicationDto;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentPdfRequestDataQueueDto;
import net.tamasnovak.rabbitmq.service.QueueSender;
import net.tamasnovak.validation.applicationFieldValidator.ExistingApplicationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

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
  private final StudentApplicationServiceConstants studentApplicationServiceConstants;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public StudentApplicationServiceImpl(AccountService accountService, StudentService studentService, InstitutionService institutionService, CountryService countryService, UniversityService universityService, ApplicationService applicationService, ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, QueueSender queueSender, ApplicationRepository applicationRepository, ExistingApplicationValidator existingApplicationValidator, StudentApplicationServiceConstants studentApplicationServiceConstants, GlobalServiceConstants globalServiceConstants) {
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
    this.studentApplicationServiceConstants = studentApplicationServiceConstants;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "AllApplicationRecordsByAccountUuid", key = "{ #authAccountUuid }")
  public List<ApplicationData> getAllApplicationResponsesByAccountUuid(final UUID authAccountUuid) {
    final List<ApplicationView> applicationViews = applicationRepository.findApplicationViewsByAccountUuid(authAccountUuid);

    return applicationViews.stream()
      .map(ApplicationData::new)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void toggleIsRemovableByApplicationUuid(final String uuid) {
    applicationRepository.updateIsRemovableFieldByUuid(UUID.fromString(uuid));
  }

  @Override
  @Transactional(readOnly = true)
  public StudentDashboardData getAggregateDataByAccount(final Account account) {
    final Student student = studentService.getByAccount(account);
    final String plannedApplicationName = applicationStatusService.getByName(ApplicationStatusType.PLANNED.getName()).getName();
    final String submittedApplicationName = applicationStatusService.getByName(ApplicationStatusType.SUBMITTED.getName()).getName();
    final String withdrawnApplicationName = applicationStatusService.getByName(ApplicationStatusType.WITHDRAWN.getName()).getName();
    final String firmChoiceName = responseStatusService.getByName(ResponseStatusType.FIRM_CHOICE.getName()).getName();
    final String finalDestinationName = finalDestinationStatusService.getByName(FinalDestinationType.FINAL_DESTINATION.getName()).getName();
    final String deferredFinalDestinationName = finalDestinationStatusService.getByName(FinalDestinationType.DEFERRED_FINAL_DESTINATION.getName()).getName();

    return new StudentDashboardData(
      student.getFirmChoiceDto(firmChoiceName),
      student.getFinalDestinationDto(finalDestinationName, deferredFinalDestinationName),
      student.getApplicationNumber(),
      student.countApplicationsByPredicate(element -> areValuesEqual(element.getApplicationStatusName(), plannedApplicationName)),
      student.countApplicationsByPredicate(element -> areValuesEqual(element.getApplicationStatusName(), submittedApplicationName)),
      student.countApplicationsByPredicate(element -> areValuesEqual(element.getApplicationStatusName(), withdrawnApplicationName)),
      student.countApplicationsByDistinctValue(net.tamasnovak.domains.application.shared.entity.Application::getCountryName),
      student.countApplicationsByDistinctValue(net.tamasnovak.domains.application.shared.entity.Application::getUniversityName),
      student.countApplicationsByPredicate(net.tamasnovak.domains.application.shared.entity.Application::isInterviewStatusNull),
      student.countApplicationsByPredicate(element -> !element.isOfferStatusNull())
    );
  }

  @Override
  @Transactional
  @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }")
  public ApplicationData create(final Account account,
                                final NewApplicationByStudent requestBody) {
    final Country country = countryService.getByUuid(requestBody.countryUuid());
    final University university = universityService.getByUuid(requestBody.universityUuid());
    country.verifyUniversityCountryLink(university, studentApplicationServiceConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    final Student student = studentService.getByAccount(account);
    final ApplicationStatus plannedApplicationStatus = applicationStatusService.getByName("Planned");
    final net.tamasnovak.domains.application.shared.entity.Application newApplication = net.tamasnovak.domains.application.shared.entity.Application.createApplicationByStudent(
      student,
      country,
      university,
      requestBody.courseName(),
      requestBody.minorSubject(),
      requestBody.programmeLength(),
      plannedApplicationStatus
    );
    final net.tamasnovak.domains.application.shared.entity.Application savedApplication = applicationRepository.save(newApplication);

    return applicationService.getApplicationDtoByUuid(savedApplication.getUuid().toString());
  }

  @Override
  @Transactional
  @Caching(evict = {
    @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }"),
    @CacheEvict(value = "SingleApplicationRecordByUuid", key = "{ #uuid }")
  })
  public ApplicationData updateAndRetrieveByUuid(final String uuid, final UpdateApplicationByStudent requestBody, final Account account) {
    final net.tamasnovak.domains.application.shared.entity.Application currentApplication = applicationService.getByUuid(uuid);
    final Student currentStudent = studentService.getByAccount(account);
    final UUID studentUuidByApplication = currentApplication.getStudentAccountUuid();

    account.verifyAuthAccountUuidAgainstAnother(studentUuidByApplication, globalServiceConstants.NO_PERMISSION);

    final ApplicationStatus newApplicationStatus = getStatusOnUpdate(
      requestBody.applicationStatusUuid(),
      currentApplication::returnApplicationStatusIfSame,
      applicationStatusService::getByUuid);
    final InterviewStatus newInterviewStatus = getStatusOnUpdate(
      requestBody.interviewStatusUuid(),
      currentApplication::returnInterviewStatusIfSame,
      interviewStatusService::getByUuid);
    final OfferStatus newOfferStatus = getStatusOnUpdate(
      requestBody.offerStatusUuid(),
      currentApplication::returnOfferStatusIfSame,
      offerStatusService::getByUuid);
    final ResponseStatus newResponseStatus = getStatusOnUpdate(
      requestBody.responseStatusUuid(),
      currentApplication::returnResponseStatusIfSame,
      responseStatusService::getByUuid);
    final FinalDestinationStatus newFinalDestinationStatus = getStatusOnUpdate(
      requestBody.finalDestinationStatusUuid(),
      currentApplication::returnFinalDestinationStatusIfSame,
      finalDestinationStatusService::getByUuid);

    existingApplicationValidator.validateStatusFields(requestBody, currentApplication, currentStudent, newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus);

    final ResponseStatus offerDeclinedStatus = responseStatusService.getByName(ResponseStatusType.OFFER_DECLINED.getName());
    final FinalDestinationStatus notFinalDestinationStatus = finalDestinationStatusService.getByName(FinalDestinationType.NOT_FINAL_DESTINATION.getName());
    currentApplication.updateStatusFields(newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus, offerDeclinedStatus, notFinalDestinationStatus);

    applicationRepository.save(currentApplication);

    return applicationService.getApplicationDtoByUuid(currentApplication.getUuid().toString());
  }

  private <T extends BaseStatusEntity> T getStatusOnUpdate(final String requestBodyStatusUuid,
                                                           final Function<String, T> checkIfStatusIsSameFn,
                                                           final Function<String, T> getByUuidFn) {
    final T statusField = checkIfStatusIsSameFn.apply(requestBodyStatusUuid);

    if (!(statusField instanceof ApplicationStatus) && areValuesEqual(requestBodyStatusUuid, "")) {
      return null;
    }

    if (statusField != null) {
      return statusField;
    }

    return getByUuidFn.apply(requestBodyStatusUuid);
  }

  private boolean areValuesEqual(final String string, final String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }

  @Override
  @Transactional
  public void onApplicationDownloadRequest(final UUID authAccountUuid) {
    final Account studentAccount = accountService.getByUuid(authAccountUuid);
    final Institution studentInstitution = institutionService.getById(studentAccount.getInstitutionId());
    final List<ApplicationData> applicationData = this.getAllApplicationResponsesByAccountUuid(authAccountUuid);

    final StudentPdfRequestDataQueueDto compiledData = compileStudentPdfSaveData(authAccountUuid, studentAccount, studentInstitution, applicationData);
    queueSender.send(PdfRequestRabbitConfig.STUDENT_PDF_SAVE_EXCHANGE_KEY, PdfRequestRabbitConfig.STUDENT_PDF_SAVE_ROUTING_KEY, compiledData);
  }

  private StudentPdfRequestDataQueueDto compileStudentPdfSaveData(final UUID authAccountUuid,
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
