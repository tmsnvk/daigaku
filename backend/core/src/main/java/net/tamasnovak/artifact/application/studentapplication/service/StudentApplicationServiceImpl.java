/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.account.account.service.AccountService;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.accounttype.student.service.StudentService;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationView;
import net.tamasnovak.artifact.application.studentapplication.dto.NewApplicationByStudent;
import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardStatistics;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudent;
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
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.service.InstitutionService;
import net.tamasnovak.artifact.support.university.entity.University;
import net.tamasnovak.artifact.support.university.service.UniversityService;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.enums.status.FinalDestinationStatusType;
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

/**
 * Service class managing {@link Student}-related {@link Application} entity-related API operations, implementing
 * {@link StudentApplicationService}.
 *
 * @since 0.0.1
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
  public StudentDashboardStatistics findStudentDashboardDataByAccount(final Account account) {
    final Student student = studentService.findStudentByAccount(account);
    final String plannedApplicationName = applicationStatusService.findByName(ApplicationStatusType.PLANNED.getName()).getName();
    final String submittedApplicationName = applicationStatusService.findByName(ApplicationStatusType.SUBMITTED.getName()).getName();
    final String withdrawnApplicationName = applicationStatusService.findByName(ApplicationStatusType.WITHDRAWN.getName()).getName();

    return new StudentDashboardStatistics(student.createFirmChoiceTileDto(), student.createFinalDestinationTileDto(),
      student.fetchApplicationNumber(),
      student.countApplicationsMatchingPredicate(element -> areValuesEqual(element.getApplicationStatusName(), plannedApplicationName)),
      student.countApplicationsMatchingPredicate(element -> areValuesEqual(element.getApplicationStatusName(), submittedApplicationName)),
      student.countApplicationsMatchingPredicate(element -> areValuesEqual(element.getApplicationStatusName(), withdrawnApplicationName)),
      student.countDistinctApplicationsByValue(Application::fetchCountryName),
      student.countDistinctApplicationsByValue(Application::fetchUniversityName),
      student.countApplicationsMatchingPredicate(Application::isInterviewStatusNull),
      student.countApplicationsMatchingPredicate(element -> !element.isOfferStatusNull()));
  }

  @Override
  @Transactional
  @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }")
  public ApplicationData createApplication(final Account account, final NewApplicationByStudent requestBody) {
    final Country country = countryService.findByUuid(UUID.fromString(requestBody.countryUuid()));
    final University university = universityService.findByUuid(UUID.fromString(requestBody.universityUuid()));
    country.verifyUniversityCountryMatch(university, StudentApplicationServiceMessages.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    final Student student = studentService.findStudentByAccount(account);
    final ApplicationStatus plannedApplicationStatus = applicationStatusService.findByName("Planned");
    final Application newApplication = Application.createApplicationByStudent(student, country, university, requestBody.courseName(),
      requestBody.minorSubject(), requestBody.programmeLength(), plannedApplicationStatus);
    final Application savedApplication = applicationRepository.save(newApplication);

    return applicationService.createApplicationDataByUuid(savedApplication.getUuid());
  }

  @Override
  @Transactional
  @Caching(evict = {
    @CacheEvict(value = "AllApplicationRecordsByAccountUuid", key = "{ #account.uuid }"),
    @CacheEvict(value = "SingleApplicationRecordByUuid", key = "{ #uuid }")
  })
  public ApplicationData updateApplicationAndFetchByUuid(
    final UUID uuid, final UpdateApplicationByStudent requestBody,
    final Account account) {
    final Application currentApplication = applicationService.findApplicationByUuid(uuid);
    final Student currentStudent = studentService.findStudentByAccount(account);
    final UUID studentUuidByApplication = currentApplication.fetchStudentAccountUuid();

    account.verifyAccountUuidMatch(studentUuidByApplication, GlobalServiceMessages.NO_PERMISSION);

    final ApplicationStatus newApplicationStatus = getStatusOnUpdate(requestBody.applicationStatusUuid(),
      currentApplication::returnApplicationStatusIfSame, applicationStatusService::findByUuid);
    final InterviewStatus newInterviewStatus = getStatusOnUpdate(requestBody.interviewStatusUuid(),
      currentApplication::returnInterviewStatusIfSame, interviewStatusService::findByUuid);
    final OfferStatus newOfferStatus = getStatusOnUpdate(requestBody.offerStatusUuid(), currentApplication::returnOfferStatusIfSame,
      offerStatusService::findByUuid);
    final ResponseStatus newResponseStatus = getStatusOnUpdate(requestBody.responseStatusUuid(),
      currentApplication::returnResponseStatusIfSame, responseStatusService::findByUuid);
    final FinalDestinationStatus newFinalDestinationStatus = getStatusOnUpdate(requestBody.finalDestinationStatusUuid(),
      currentApplication::returnFinalDestinationStatusIfSame, finalDestinationStatusService::findByUuid);

    existingApplicationValidator.validateStatusFields(requestBody, currentApplication, currentStudent, newApplicationStatus,
      newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus);

    final ResponseStatus offerDeclinedStatus = responseStatusService.findByName(ResponseStatusType.OFFER_DECLINED.getValue());
    final FinalDestinationStatus notFinalDestinationStatus = finalDestinationStatusService.findByName(
      FinalDestinationStatusType.NOT_FINAL_DESTINATION.getValue());
    currentApplication.updateStatusFields(newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus,
      newFinalDestinationStatus, offerDeclinedStatus, notFinalDestinationStatus);

    applicationRepository.save(currentApplication);

    return applicationService.createApplicationDataByUuid(currentApplication.getUuid());
  }

  private <T extends BaseStatusEntity> T getStatusOnUpdate(
    final String bodyStatusId, final Function<UUID, T> checkIfStatusIsSameFn,
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
  public void initiateApplicationPdfDownloadRequest(final UUID accountUuid) {
    final Account studentAccount = accountService.findAccountByUuid(accountUuid);
    final Institution studentInstitution = institutionService.findById(studentAccount.fetchInstitutionId());
    final List<ApplicationData> applicationData = this.findApplicationDataByAccountUuid(accountUuid);

    final StudentPdfRequestDataQueueDto compiledData = compileStudentPdfSaveData(accountUuid, studentAccount, studentInstitution,
      applicationData);
    queueSender.send(PdfRequestRabbitConfig.STUDENT_PDF_SAVE_EXCHANGE_KEY, PdfRequestRabbitConfig.STUDENT_PDF_SAVE_ROUTING_KEY,
      compiledData);
  }

  private StudentPdfRequestDataQueueDto compileStudentPdfSaveData(
    final UUID authAccountUuid, final Account studentAccount,
    final Institution studentInstitution,
    final List<ApplicationData> applications) {
    final StudentAccountDto accountDto = new StudentAccountDto(studentAccount.getFullName(), studentAccount.getEmail(),
      studentInstitution.getName());
    final List<StudentApplicationDto> applicationDtos = new ArrayList<>();

    for (ApplicationData application : applications) {
      final StudentApplicationDto applicationQueueDto = new StudentApplicationDto(application.createdAt(), application.lastUpdatedAt(),
        application.courseName(), application.university(), application.country(), application.applicationStatus(),
        application.interviewStatus(), application.offerStatus(), application.responseStatus(), application.finalDestinationStatus());

      applicationDtos.add(applicationQueueDto);
    }

    return new StudentPdfRequestDataQueueDto(authAccountUuid, accountDto, applicationDtos);
  }
}
