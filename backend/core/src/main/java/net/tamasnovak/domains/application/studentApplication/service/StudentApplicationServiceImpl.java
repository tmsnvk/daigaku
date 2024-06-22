package net.tamasnovak.domains.application.studentApplication.service;

import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.account.account.service.AccountService;
import net.tamasnovak.domains.accountRole.student.models.entity.Student;
import net.tamasnovak.domains.accountRole.student.service.StudentService;
import net.tamasnovak.domains.application.application.service.ApplicationService;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.domains.application.shared.persistence.ApplicationView;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.NewApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.UpdateApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoResponses.StudentDashboardDataDto;
import net.tamasnovak.domains.applicationStages.applicationStatus.models.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.applicationStatus.service.ApplicationStatusService;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.models.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.finalDestinationStatus.service.FinalDestinationStatusService;
import net.tamasnovak.domains.applicationStages.interviewStatus.models.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.interviewStatus.service.InterviewStatusService;
import net.tamasnovak.domains.applicationStages.offerStatus.models.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.offerStatus.service.OfferStatusService;
import net.tamasnovak.domains.applicationStages.responseStatus.models.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.service.ResponseStatusService;
import net.tamasnovak.domains.applicationStages.shared.models.entity.BaseStatusEntity;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.domains.support.country.models.entity.Country;
import net.tamasnovak.domains.support.country.service.CountryService;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import net.tamasnovak.domains.support.institution.service.InstitutionService;
import net.tamasnovak.domains.support.university.models.entity.University;
import net.tamasnovak.domains.support.university.service.UniversityService;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.enums.status.FinalDestinationType;
import net.tamasnovak.enums.status.ResponseStatusType;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.RabbitMQCommonConfig;
import net.tamasnovak.rabbitmq.models.application.StudentApplicationQueueDto;
import net.tamasnovak.rabbitmq.models.queueDto.StudentPdfSaveQueueDto;
import net.tamasnovak.rabbitmq.models.student.StudentAccountQueueDto;
import net.tamasnovak.rabbitmq.service.queueSender.QueueSender;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.validation.applicationFieldValidator.ExistingApplicationValidator;
import org.springframework.beans.factory.annotation.Autowired;
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
  private final EmailService emailService;
  private final QueueSender queueSender;
  private final ApplicationRepository applicationRepository;
  private final ExistingApplicationValidator existingApplicationValidator;
  private final StudentApplicationConstants studentApplicationConstants;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public StudentApplicationServiceImpl(AccountService accountService, StudentService studentService, InstitutionService institutionService, CountryService countryService, UniversityService universityService, ApplicationService applicationService, ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, EmailService emailService, QueueSender queueSender, ApplicationRepository applicationRepository, ExistingApplicationValidator existingApplicationValidator, StudentApplicationConstants studentApplicationConstants, GlobalServiceConstants globalServiceConstants) {
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
    this.emailService = emailService;
	  this.queueSender = queueSender;
	  this.applicationRepository = applicationRepository;
    this.existingApplicationValidator = existingApplicationValidator;
    this.studentApplicationConstants = studentApplicationConstants;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "AllApplicationRecordsByAccountUuid", key = "{ #authAccountUuid }")
  public List<ApplicationDto> getAllApplicationDtosByAccountUuid(UUID authAccountUuid) {
    List<ApplicationView> applicationViews = applicationRepository.findApplicationViewsByAccountUuid(authAccountUuid);

    return applicationViews.stream()
      .map(ApplicationDto::new)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void toggleIsRemovableByApplicationUuid(String uuid) {
    applicationRepository.updateIsRemovableFieldByUuid(UUID.fromString(uuid));
  }

  @Override
  @Transactional(readOnly = true)
  public StudentDashboardDataDto getAggregateDataByAccount(Account account) {
    Student student = studentService.getByAccount(account);
    String plannedApplicationName = applicationStatusService.getByName(ApplicationStatusType.PLANNED.getName()).getName();
    String submittedApplicationName = applicationStatusService.getByName(ApplicationStatusType.SUBMITTED.getName()).getName();
    String withdrawnApplicationName = applicationStatusService.getByName(ApplicationStatusType.WITHDRAWN.getName()).getName();
    String firmChoiceName = responseStatusService.getByName(ResponseStatusType.FIRM_CHOICE.getName()).getName();
    String finalDestinationName = finalDestinationStatusService.getByName(FinalDestinationType.FINAL_DESTINATION.getName()).getName();
    String deferredFinalDestinationName = finalDestinationStatusService.getByName(FinalDestinationType.DEFERRED_FINAL_DESTINATION.getName()).getName();

    return new StudentDashboardDataDto(
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
  public ApplicationDto create(Account account, NewApplicationByStudentDto requestBody) {
    Country country = countryService.getByUuid(requestBody.countryUuid());
    University university = universityService.getByUuid(requestBody.universityUuid());

    country.verifyUniversityCountryLink(university, studentApplicationConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    Student student = studentService.getByAccount(account);
    ApplicationStatus plannedApplicationStatus = applicationStatusService.getByName("Planned");

    Application newApplication = Application.createApplicationByStudent(
      student,
      country,
      university,
      requestBody.courseName(),
      requestBody.minorSubject(),
      requestBody.programmeLength(),
      plannedApplicationStatus
    );

    Application savedApplication = applicationRepository.save(newApplication);

    return applicationService.getApplicationDtoByUuid(savedApplication.getUuid().toString());
  }

  @Override
  @Transactional
  @Caching(evict = {
    @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }"),
    @CacheEvict(value = "SingleApplicationRecordByUuid", key = "{ #uuid }")
  })
  public ApplicationDto updateAndRetrieveByUuid(String uuid, UpdateApplicationByStudentDto requestBody, Account account) {
    Application currentApplication = applicationService.getByUuid(uuid);
    Student currentStudent = studentService.getByAccount(account);

    UUID studentUuidByApplication = currentApplication.getStudentAccountUuid();

    account.verifyAuthAccountUuidAgainstAnother(studentUuidByApplication, globalServiceConstants.NO_PERMISSION);

    ApplicationStatus newApplicationStatus = getStatusOnUpdate(
      requestBody.applicationStatusUuid(),
      currentApplication::returnApplicationStatusIfSame,
      applicationStatusService::getByUuid);
    InterviewStatus newInterviewStatus = getStatusOnUpdate(
      requestBody.interviewStatusUuid(),
      currentApplication::returnInterviewStatusIfSame,
      interviewStatusService::getByUuid);
    OfferStatus newOfferStatus = getStatusOnUpdate(
      requestBody.offerStatusUuid(),
      currentApplication::returnOfferStatusIfSame,
      offerStatusService::getByUuid);
    ResponseStatus newResponseStatus = getStatusOnUpdate(
      requestBody.responseStatusUuid(),
      currentApplication::returnResponseStatusIfSame,
      responseStatusService::getByUuid);
    FinalDestinationStatus newFinalDestinationStatus = getStatusOnUpdate(
      requestBody.finalDestinationStatusUuid(),
      currentApplication::returnFinalDestinationStatusIfSame,
      finalDestinationStatusService::getByUuid);

    existingApplicationValidator.validateStatusFields(requestBody, currentApplication, currentStudent, newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus);

    ResponseStatus offerDeclinedStatus = responseStatusService.getByName(ResponseStatusType.OFFER_DECLINED.getName());
    FinalDestinationStatus notFinalDestinationStatus = finalDestinationStatusService.getByName(FinalDestinationType.NOT_FINAL_DESTINATION.getName());

    currentApplication.updateStatusFields(newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus, offerDeclinedStatus, notFinalDestinationStatus);

    applicationRepository.save(currentApplication);

    return applicationService.getApplicationDtoByUuid(currentApplication.getUuid().toString());
  }

  private <T extends BaseStatusEntity> T getStatusOnUpdate(String requestBodyStatusUuid, Function<String, T> checkIfStatusIsSameFn, Function<String, T> getByUuidFn) {
    T statusField = checkIfStatusIsSameFn.apply(requestBodyStatusUuid);

    if (!(statusField instanceof ApplicationStatus) && areValuesEqual(requestBodyStatusUuid, "")) {
      return null;
    }

    if (statusField != null) {
      return statusField;
    }

    return getByUuidFn.apply(requestBodyStatusUuid);
  }

  private boolean areValuesEqual(String string, String stringToCheckAgainst) {
    return Objects.equals(string, stringToCheckAgainst);
  }

  @Override
  @Transactional(readOnly = true)
  public void handleApplicationDownloadRequest(UUID authAccountUuid) {
    Account studentAccount = accountService.getByUuid(authAccountUuid);
    Institution studentInstitution = institutionService.getById(studentAccount.getInstitutionId());
    List<ApplicationDto> applications = this.getAllApplicationDtosByAccountUuid(authAccountUuid);

    StudentPdfSaveQueueDto compiledData = compileStudentPdfSaveData(authAccountUuid, studentAccount, studentInstitution, applications);
    queueSender.send(RabbitMQCommonConfig.STUDENT_DATA_PDF_SAVE_EXCHANGE_KEY, RabbitMQCommonConfig.STUDENT_PDF_SAVE_ROUTING_KEY, compiledData);

    //    String pdfDirectLink = pdfService.createStudentApplicationsPdf(studentAccount, studentInstitution, authAccountUuid, applications);
//    String content = String.format(studentApplicationConstants.STUDENT_PDF_EMAIL_BODY, studentAccount.getFullName(), pdfDirectLink);

//    NewEmailDto emailContent = new NewEmailDto(
//      studentAccount.getEmail(),
//      studentApplicationConstants.STUDENT_PDF_EMAIL_SUBJECT,
//      content
//    );
//
//    emailService.sendSimpleEmail(emailContent);
  }

  private StudentPdfSaveQueueDto compileStudentPdfSaveData(UUID authAccountUuid, Account studentAccount, Institution studentInstitution, List<ApplicationDto> applications) {
    StudentAccountQueueDto studentAccountQueueDto = new StudentAccountQueueDto(studentAccount.getFullName(), studentAccount.getEmail(), studentInstitution.getName());

    List<StudentApplicationQueueDto> queueApplications = new ArrayList<>();

    for (ApplicationDto application : applications) {
      StudentApplicationQueueDto applicationQueueDto = new StudentApplicationQueueDto(
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

      queueApplications.add(applicationQueueDto);
    }

    return new StudentPdfSaveQueueDto(
      authAccountUuid,
      studentAccountQueueDto,
      queueApplications
    );
  }
}
