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
import net.tamasnovak.services.account.accountByRole.student.StudentService;
import net.tamasnovak.services.application.application.ApplicationService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.status.GenericStatusService;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentApplicationServiceImpl implements StudentApplicationService {
  private final AuthenticationFacade authenticationFacade;
  private final StudentService studentService;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final ApplicationService applicationService;
  private final ApplicationStatusService applicationStatusService;
  private final InterviewStatusService interviewStatusService;
  private final OfferStatusService offerStatusService;
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;
  private final ApplicationRepository applicationRepository;
  private final ValidatorUtilities validatorUtilities;
  private final ApplicationFieldsValidator applicationFieldsValidator;
  private final ApplicationMapper applicationMapper;
  private final StudentApplicationConstants studentApplicationConstants;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public StudentApplicationServiceImpl(AuthenticationFacade authenticationFacade, StudentService studentService, CountryService countryService, UniversityService universityService, ApplicationService applicationService, ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, ApplicationRepository applicationRepository, ValidatorUtilities validatorUtilities, ApplicationFieldsValidator applicationFieldsValidator, ApplicationMapper applicationMapper, StudentApplicationConstants studentApplicationConstants, GlobalServiceConstants globalServiceConstants) {
    this.authenticationFacade = authenticationFacade;
    this.studentService = studentService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.applicationService = applicationService;
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

  @Override
  @Transactional(readOnly = true)
  public List<MappedApplicationView> getAllMappedApplicationViewsByStudent(Account account) {
    Student student = studentService.getStudentByAccount(account);

    List<ApplicationView> applicationViews = applicationRepository.findApplicationViewsByStudentId(student.getId());

    return applicationViews.stream().map(applicationMapper::toMappedApplicationView).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public MappedApplicationView createApplication(Account account, NewApplicationByStudentDto requestBody) {
    Country country = countryService.getCountryByUuid(requestBody.countryUuid());
    University university = universityService.getUniversityByUuid(requestBody.universityUuid());

    country.verifyUniversityCountryLink(university, studentApplicationConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    Student student = studentService.getStudentByAccount(account);
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

    return applicationService.getMappedApplicationViewByUuid(savedApplication.getUuid().toString());
  }

  @Override
  @Transactional
  public MappedApplicationView updateApplicationByUuid(String applicationUuid, UpdateApplicationByStudentDto requestBody) {
    Application currentApplication = applicationService.getApplicationByUuid(applicationUuid);

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

    return applicationService.getMappedApplicationViewByUuid(applicationUuid);
  }

  @Override
  @Transactional
  public void toggleIsRemovableByApplicationUuid(String uuid) {
    applicationRepository.updateIsRemovableByUuid(UUID.fromString(uuid));
  }

  @Override
  @Transactional(readOnly = true)
  public DashboardAggregateDataDto getAggregateDataDtoByAccount(Account account) {
    Student student = studentService.getStudentByAccount(account);

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

  private <T extends BaseStatusEntity> T getStatusByUuidOnUpdate(T status, String requestBodyStatusUuid, GenericStatusService<T> service) {
    if (status != null && Objects.equals(status.getUuid().toString(), requestBodyStatusUuid)) {
      return status;
    }

    if (!(status instanceof ApplicationStatus) && Objects.equals(requestBodyStatusUuid, "")) {
      return null;
    }

    return service.getStatusByUuid(requestBodyStatusUuid);
  }
}
