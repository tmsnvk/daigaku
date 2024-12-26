/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.account.account.service.AccountService;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.accounttype.student.service.StudentService;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.common.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.common.persistence.ApplicationView;
import net.tamasnovak.artifact.application.studentapplication.dto.NewApplicationByStudentRequest;
import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardDetails;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudentRequest;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.service.ApplicationStatusService;
import net.tamasnovak.artifact.applicationstatus.common.entity.BaseStatusEntity;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.service.InterviewStatusService;
import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstatus.offerstatus.service.OfferStatusService;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.service.ResponseStatusService;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import net.tamasnovak.artifact.support.institution.service.InstitutionService;
import net.tamasnovak.artifact.support.university.entity.University;
import net.tamasnovak.artifact.support.university.service.UniversityService;
import net.tamasnovak.enums.status.ApplicationStatusE;
import net.tamasnovak.enums.status.FinalDestinationStatusE;
import net.tamasnovak.enums.status.ResponseStatusE;
import net.tamasnovak.rabbitmq.configuration.rabbitmq.PdfRequestRabbitConfig;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.AccountBaseDetails;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentApplicationDto;
import net.tamasnovak.rabbitmq.models.s3PdfQueue.student.StudentPdfRequestDataQueueDto;
import net.tamasnovak.rabbitmq.service.QueueSender;
import net.tamasnovak.utils.StringUtils;
import net.tamasnovak.validation.applicationfieldvalidator.ExistingApplicationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Student}-related {@link Application} entity-related operations, implementing
 * {@link StudentApplicationService}.
 */
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

  @Autowired
  public StudentApplicationServiceImpl(
    AccountService accountService, StudentService studentService, InstitutionService institutionService, CountryService countryService,
    UniversityService universityService, ApplicationService applicationService, ApplicationStatusService applicationStatusService,
    InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService,
    FinalDestinationStatusService finalDestinationStatusService, QueueSender queueSender, ApplicationRepository applicationRepository,
    ExistingApplicationValidator existingApplicationValidator) {
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
    @CacheEvict(value = "SingleApplicationRecordByUuid", key = "{ #applicationUuid }")
  })
  public void toggleIsRemovableByApplicationUuid(final UUID applicationUuid, final UUID accountUuid) {
    applicationRepository.toggleIsRemovableByApplicationUuid(applicationUuid);
  }

  @Override
  @Transactional(readOnly = true)
  public StudentDashboardDetails findStudentDashboardDataByAccount(final Account account) {
    // Finds the authenticated Student user.
    final Student student = studentService.findStudentByAccount(account);

    // Finds the relevant status names.
    final String plannedStatus = applicationStatusService.findStatusByName(ApplicationStatusE.PLANNED.getName()).getName();
    final String submittedStatus = applicationStatusService.findStatusByName(ApplicationStatusE.SUBMITTED.getName()).getName();
    final String withdrawnStatus = applicationStatusService.findStatusByName(ApplicationStatusE.WITHDRAWN.getName()).getName();
    final String firmChoiceStatus = responseStatusService.findStatusByName(ResponseStatusE.FIRM_CHOICE.getValue()).getName();
    final String finalDestinationStatus = finalDestinationStatusService.findStatusByName(
                                                                         FinalDestinationStatusE.FINAL_DESTINATION.getValue())
                                                                       .getName();
    final String deferredFinalDestinationStatusName = finalDestinationStatusService.findStatusByName(
      FinalDestinationStatusE.DEFERRED_FINAL_DESTINATION.getValue()).getName();

    // Creates the StudentDashboardDetails instance.
    return new StudentDashboardDetails(
      student.createFirmChoiceTileDetails(firmChoiceStatus),
      student.createFinalDestinationTileDetails(finalDestinationStatus, deferredFinalDestinationStatusName),
      student.fetchApplicationNumber(),
      student.countApplicationsMatchingPredicate(
        element -> StringUtils.validateStringsAreEqual(element.fetchApplicationStatusName(), plannedStatus)),
      student.countApplicationsMatchingPredicate(
        element -> StringUtils.validateStringsAreEqual(element.fetchApplicationStatusName(), submittedStatus)),
      student.countApplicationsMatchingPredicate(
        element -> StringUtils.validateStringsAreEqual(element.fetchApplicationStatusName(), withdrawnStatus)),
      student.countDistinctApplicationsByValue(Application::fetchCountryName),
      student.countDistinctApplicationsByValue(Application::fetchUniversityName),
      student.countApplicationsMatchingPredicate(Application::isInterviewStatusNull),
      student.countApplicationsMatchingPredicate(element -> !element.isOfferStatusNull()));
  }

  @Override
  @Transactional
  @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }")
  public ApplicationData createApplication(final Account account, final NewApplicationByStudentRequest requestBody) {
    // Finds the country and university that were requested on the frontend and validates their connection.
    final Country country = countryService.findCountryByUuid(UUID.fromString(requestBody.countryUuid()));
    final University university = universityService.findUniversityByUuid(UUID.fromString(requestBody.universityUuid()));
    country.validateUniversityCountryMatch(university, StudentApplicationServiceMessages.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    // Finds the authenticated student user.
    final Student student = studentService.findStudentByAccount(account);

    // Finds the 'Planned' ApplicationStatus to insert into the new Application instance.
    final ApplicationStatus plannedApplicationStatus = applicationStatusService.findStatusByName(ApplicationStatusE.PLANNED.getName());

    // Creates the Application instance and saves it in the database.
    final Application newApplication = Application.createApplicationByStudent(student, country, university, requestBody.courseName(),
      requestBody.minorSubject(), requestBody.programmeLength(), plannedApplicationStatus);
    final Application savedApplication = applicationRepository.save(newApplication);

    // Returns the new Application's relevant data to the frontend where it is added to the local cache.
    return applicationService.createApplicationData(savedApplication.getUuid());
  }

  @Override
  @Transactional
  @Caching(evict = {
    @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }"),
    @CacheEvict(value = "SingleApplicationRecordByUuid", key = "{ #uuid }")
  })
  public ApplicationData updateApplicationAndFetchByUuid(
    final UUID uuid, final UpdateApplicationByStudentRequest requestBody, final Account account) {
    // Finds the to-be-updated Application and related Student instances in the database.
    final Application currentApplication = applicationService.findApplicationByUuid(uuid);
    final Student currentStudent = studentService.findStudentByAccount(account);
    // Confirms that the authenticated user has permission to view the selected Application.
    final UUID studentUuidByApplication = currentApplication.fetchStudentAccountUuid();
    account.verifyAccountUuidMatch(studentUuidByApplication, GlobalServiceMessages.NO_PERMISSION);

    // Finds and validates the to-be updated Application's current and new Status fields.
    final ApplicationStatus newApplicationStatus = getStatusOnUpdate(requestBody.applicationStatusUuid(),
      currentApplication::returnApplicationStatusIfSame, applicationStatusService::findStatusByUuid);
    final InterviewStatus newInterviewStatus = getStatusOnUpdate(requestBody.interviewStatusUuid(),
      currentApplication::returnInterviewStatusIfSame, interviewStatusService::findStatusByUuid);
    final OfferStatus newOfferStatus = getStatusOnUpdate(requestBody.offerStatusUuid(), currentApplication::returnOfferStatusIfSame,
      offerStatusService::findStatusByUuid);
    final ResponseStatus newResponseStatus = getStatusOnUpdate(requestBody.responseStatusUuid(),
      currentApplication::returnResponseStatusIfSame, responseStatusService::findStatusByUuid);
    final FinalDestinationStatus newFinalDestinationStatus = getStatusOnUpdate(requestBody.finalDestinationStatusUuid(),
      currentApplication::returnFinalDestinationStatusIfSame, finalDestinationStatusService::findStatusByUuid);
    existingApplicationValidator.validateApplication(requestBody, currentApplication, currentStudent, newApplicationStatus,
      newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus);

    // Updates the Application instance with the validated new fields and saves it in the database.
    final ResponseStatus offerDeclinedStatus = responseStatusService.findStatusByName(ResponseStatusE.OFFER_DECLINED.getValue());
    final FinalDestinationStatus notFinalDestinationStatus = finalDestinationStatusService.findStatusByName(
      FinalDestinationStatusE.NOT_FINAL_DESTINATION.getValue());
    currentApplication.updateStatusFields(newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus,
      newFinalDestinationStatus, offerDeclinedStatus, notFinalDestinationStatus);
    applicationRepository.save(currentApplication);

    // Returns the updated Application's relevant data to the frontend where it is added to the local cache.
    return applicationService.createApplicationData(currentApplication.getUuid());
  }

  /**
   * TODO
   *
   * @param bodyStatusId
   * @param checkIfStatusIsSameFn
   * @param getByUuidFn
   * @param <T>
   * @return
   */
  private <T extends BaseStatusEntity> T getStatusOnUpdate(
    final String bodyStatusId, final Function<UUID, T> checkIfStatusIsSameFn,
    final Function<UUID, T> getByUuidFn) {
    if (bodyStatusId.isEmpty()) {
      return null;
    }

    final T statusField = checkIfStatusIsSameFn.apply(UUID.fromString(bodyStatusId));

    if (!(statusField instanceof ApplicationStatus) && StringUtils.validateStringsAreEqual(bodyStatusId, "")) {
      return null;
    }

    if (statusField != null) {
      return statusField;
    }

    return getByUuidFn.apply(UUID.fromString(bodyStatusId));
  }

  @Override
  @Transactional
  public void initiateApplicationPdfDownloadRequest(final UUID accountUuid) {
    // Finds the authenticated Account and the Applications associated with it.
    final Account studentAccount = accountService.findAccountByUuid(accountUuid);
    final List<ApplicationData> applicationData = this.findApplicationDataByAccountUuid(accountUuid);

    // Prepares and dispatches the DTO object to the message queue.
    final StudentPdfRequestDataQueueDto compiledData = compileStudentPdfSaveData(accountUuid, studentAccount, applicationData);
    queueSender.send(PdfRequestRabbitConfig.STUDENT_PDF_SAVE_EXCHANGE_KEY, PdfRequestRabbitConfig.STUDENT_PDF_SAVE_ROUTING_KEY,
      compiledData);
  }

  /**
   * Compiles the DTO object for the student's .pdf data download request.
   *
   * @param authAccountUuid The authenticated student user's uuid.
   * @param studentAccount The student's account instance.
   * @param applications The student's application instances.
   * @return {@link StudentPdfRequestDataQueueDto}.
   */
  private StudentPdfRequestDataQueueDto compileStudentPdfSaveData(
    final UUID authAccountUuid, final Account studentAccount, final List<ApplicationData> applications) {
    // Creates an Account DTO and a list storage instances for the message queue.
    final AccountBaseDetails accountBaseDetails = studentAccount.createAccountBaseDetails();
    final List<StudentApplicationDto> applicationQueueDtos = new ArrayList<>();

    // Maps the Application instances into DTO instances.
    for (ApplicationData application : applications) {
      final StudentApplicationDto applicationQueueDto = new StudentApplicationDto(application.createdAt(), application.lastUpdatedAt(),
        application.courseName(), application.university(), application.country(), application.applicationStatus().name(),
        application.interviewStatus().name(), application.offerStatus().name(), application.responseStatus().name(),
        application.finalDestinationStatus().name());

      applicationQueueDtos.add(applicationQueueDto);
    }

    // Returns with the compiled object instance.
    return new StudentPdfRequestDataQueueDto(authAccountUuid, accountBaseDetails, applicationQueueDtos);
  }
}
