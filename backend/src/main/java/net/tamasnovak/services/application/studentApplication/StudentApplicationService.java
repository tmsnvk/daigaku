package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.applicationView.ApplicationView;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.entities.base.status.BaseStatusEntity;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.enums.status.ApplicationStatusType;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.account.accountRole.AccountRoleService;
import net.tamasnovak.services.account.accountRole.student.StudentCoreService;
import net.tamasnovak.services.application.ApplicationLifeCycleService;
import net.tamasnovak.services.application.application.ApplicationCoreService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.status.CoreStatusService;
import net.tamasnovak.services.status.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.status.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.status.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.status.offerStatus.OfferStatusService;
import net.tamasnovak.services.status.responseStatus.ResponseStatusService;
import net.tamasnovak.services.university.UniversityService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import net.tamasnovak.utilities.mapper.ApplicationMapper;
import net.tamasnovak.utilities.validator.ValidatorUtilities;
import net.tamasnovak.utilities.validator.applicationFieldValidator.ApplicationFieldsValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Qualifier(value = "StudentApplicationService")
public class StudentApplicationService implements StudentApplicationCoreService, ApplicationLifeCycleService<MappedApplicationView, NewApplicationByStudentDto, UpdateApplicationByStudentDto> {
  private final AuthenticationFacade authenticationFacade;
  private final StudentCoreService studentCoreService;
  private final AccountRoleService<Student> studentAccountRoleService;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final ApplicationCoreService applicationCoreService;
  private final ApplicationStatusService applicationStatusService;
  private final InterviewStatusService interviewStatusService;
  private final OfferStatusService offerStatusService;
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;
  private final ApplicationRepository applicationRepository;
  private final ValidatorUtilities validatorUtilities;
  private final ApplicationFieldsValidator applicationFieldsValidator;
  private final ApplicationMapper applicationMapper;
  private final StudentApplicationServiceConstants studentApplicationConstants;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public StudentApplicationService(AuthenticationFacade authenticationFacade, StudentCoreService studentCoreService, @Qualifier("StudentService") AccountRoleService<Student> studentAccountRoleService, CountryService countryService, UniversityService universityService, ApplicationCoreService applicationCoreService, ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, ApplicationRepository applicationRepository, ValidatorUtilities validatorUtilities, ApplicationFieldsValidator applicationFieldsValidator, ApplicationMapper applicationMapper, StudentApplicationServiceConstants studentApplicationConstants, GlobalServiceConstants globalServiceConstants) {
    this.authenticationFacade = authenticationFacade;
    this.studentCoreService = studentCoreService;
    this.studentAccountRoleService = studentAccountRoleService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.applicationCoreService = applicationCoreService;
    this.applicationStatusService = applicationStatusService;
    this.interviewStatusService = interviewStatusService;
    this.offerStatusService = offerStatusService;
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
    this.applicationRepository = applicationRepository;
    this.validatorUtilities = validatorUtilities;
    this.applicationFieldsValidator = applicationFieldsValidator;
    this.applicationMapper = applicationMapper;
    this.studentApplicationConstants = studentApplicationConstants;
    this.globalServiceConstants = globalServiceConstants;
  }

  /*
   * StudentApplicationCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  public List<MappedApplicationView> getAllMappedApplicationViewsByStudent(Account account) {
    Student student = studentAccountRoleService.getAccountRoleByAccount(account);

    List<ApplicationView> applicationViews = applicationRepository.findApplicationViewsByStudentId(student.getId());

    return applicationViews.stream().map(applicationMapper::toMappedApplicationView).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void toggleIsRemovableFieldByApplicationUuid(String uuid) {
    applicationRepository.updateIsRemovableFieldByUuid(UUID.fromString(uuid));
  }

  @Override
  @Transactional(readOnly = true)
  public DashboardAggregateDataDto getAggregateDataDtoByStudent(Account account) {
    Student student = studentAccountRoleService.getAccountRoleByAccount(account);

    return new DashboardAggregateDataDto(
      student.getFirmChoiceDto(),
      student.getFinalDestinationDto(),
      student.getApplicationsSize(),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), ApplicationStatusType.PLANNED.getName())),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), ApplicationStatusType.SUBMITTED.getName())),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), ApplicationStatusType.WITHDRAWN.getName())),
      student.countApplicationsByDistinctValue(Application::getCountry),
      student.countApplicationsByDistinctValue(Application::getUniversity),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getInterviewStatus(), null)),
      student.countApplicationsByPredicate(element -> element.getOfferStatus() != null)
    );
  }

  /*
   * ApplicationLifeCycleService interface implementations
   */
  @Override
  @Transactional
  public MappedApplicationView create(Account account, NewApplicationByStudentDto requestBody) {
    Country country = countryService.getCountryByUuid(requestBody.countryUuid());
    University university = universityService.getUniversityByUuid(requestBody.universityUuid());

    country.verifyUniversityCountryLink(university, studentApplicationConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    Student student = studentAccountRoleService.getAccountRoleByAccount(account);
    ApplicationStatus plannedApplicationStatus = applicationStatusService.getStatusByName("Planned");

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

    return applicationCoreService.getMappedApplicationViewByUuid(savedApplication.getUuid().toString());
  }

  @Override
  @Transactional
  public MappedApplicationView updateByUuid(String applicationUuid, UpdateApplicationByStudentDto requestBody) {
    Application currentApplication = applicationCoreService.getApplicationByUuid(applicationUuid);

    UUID authAccountUuid = authenticationFacade.getAuthenticatedAccount().getUuid();
    UUID studentUuidByApplication = currentApplication.getStudent().getAccount().getUuid();

    validatorUtilities.verifyUuidMatch(authAccountUuid, studentUuidByApplication, globalServiceConstants.NO_PERMISSION);

    ApplicationStatus newApplicationStatus = getStatusByUuidOnUpdate(currentApplication.getApplicationStatus(), requestBody.applicationStatusUuid(), applicationStatusService);
    InterviewStatus newInterviewStatus = getStatusByUuidOnUpdate(currentApplication.getInterviewStatus(), requestBody.interviewStatusUuid(), interviewStatusService);
    OfferStatus newOfferStatus = getStatusByUuidOnUpdate(currentApplication.getOfferStatus(), requestBody.offerStatusUuid(), offerStatusService);
    ResponseStatus newResponseStatus = getStatusByUuidOnUpdate(currentApplication.getResponseStatus(), requestBody.responseStatusUuid(), responseStatusService);
    FinalDestinationStatus newFinalDestinationStatus = getStatusByUuidOnUpdate(currentApplication.getFinalDestinationStatus(), requestBody.finalDestinationStatusUuid(), finalDestinationStatusService);

    applicationFieldsValidator.validateStatusFields(requestBody, currentApplication, newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus);
    currentApplication.updateStatusFields(newApplicationStatus, newInterviewStatus, newOfferStatus, newResponseStatus, newFinalDestinationStatus);

    applicationRepository.save(currentApplication);

    return applicationCoreService.getMappedApplicationViewByUuid(applicationUuid);
  }

  private <T extends BaseStatusEntity> T getStatusByUuidOnUpdate(T status, String requestBodyStatusUuid, CoreStatusService<T> service) {
    if (status != null && Objects.equals(status.getUuid().toString(), requestBodyStatusUuid)) {
      return status;
    }

    if (!(status instanceof ApplicationStatus) && Objects.equals(requestBodyStatusUuid, "")) {
      return null;
    }

    return service.getStatusByUuid(requestBodyStatusUuid);
  }
}
