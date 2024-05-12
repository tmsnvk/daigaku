package net.tamasnovak.services.application.studentApplication;

import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.enums.ApplicationStatusType;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.application.ApplicationMapper;
import net.tamasnovak.services.application.application.ApplicationService;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.offerStatus.OfferStatusService;
import net.tamasnovak.services.responseStatus.ResponseStatusService;
import net.tamasnovak.services.role.student.StudentService;
import net.tamasnovak.services.university.UniversityService;
import net.tamasnovak.utilities.ValidatorUtilities;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
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
  private final AccountService accountService;
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
  private final ApplicationMapper applicationMapper;
  private final ValidatorUtilities validatorUtilities;
  private final StudentApplicationConstants studentApplicationConstants;

  @Autowired
  public StudentApplicationServiceImpl(AuthenticationFacade authenticationFacade, AccountService accountService, StudentService studentService, CountryService countryService, UniversityService universityService, ApplicationService applicationService, ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ValidatorUtilities validatorUtilities, StudentApplicationConstants studentApplicationConstants) {
    this.authenticationFacade = authenticationFacade;
    this.accountService = accountService;
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
    this.applicationMapper = applicationMapper;
    this.validatorUtilities = validatorUtilities;
    this.studentApplicationConstants = studentApplicationConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<ApplicationDto> getAllByStudent(Account account) {
    Student student = studentService.findByAccount(account);
    List<Application> applications = applicationRepository.findApplicationsByStudent(student);

    return applications.stream()
      .map((application) -> {
        String applicationCreatedBy = accountService.findByEmail(application.getCreatedBy()).getFullName();
        String applicationLastModifiedBy = accountService.findByEmail(application.getLastModifiedBy()).getFullName();

        return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
      })
      .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public ApplicationDto create(Account account, NewApplicationByStudentDto newApplicationByStudentDto) {
    Country country = countryService.findByUuid(newApplicationByStudentDto.countryUuid());
    University university = universityService.findByUuid(newApplicationByStudentDto.universityUuid());

    country.checkIfUniversityBelongsToCountry(university, studentApplicationConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    Student student = studentService.findByAccount(account);
    ApplicationStatus plannedApplicationStatus = applicationStatusService.findByName(ApplicationStatusType.PLANNED.getType());

    Application application = Application.createNewApplicationByStudent(
      student,
      country,
      university,
      newApplicationByStudentDto.courseName(),
      newApplicationByStudentDto.minorSubject(),
      newApplicationByStudentDto.programmeLength(),
      plannedApplicationStatus
    );

    applicationRepository.save(application);

    String applicationCreatedBy = accountService.findByEmail(application.getCreatedBy()).getFullName();
    String applicationLastModifiedBy = accountService.findByEmail(application.getLastModifiedBy()).getFullName();

    return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
  }

  @Override
  @Transactional
  public ApplicationDto updateByUuid(String applicationUuid, UpdateApplicationByStudentDto applicationDto) {
    Application application = applicationService.findByUuid(applicationUuid);

    UUID authAccountUuid = authenticationFacade.getAuthenticatedAccount().getUuid();
    UUID studentUuidByApplication = application.getStudent().getAccount().getUuid();

    validatorUtilities.checkIfUuidsAreEqual(authAccountUuid, studentUuidByApplication, studentApplicationConstants.NO_PERMISSION_AS_STUDENT);

    ApplicationStatus applicationStatus = applicationStatusService.findByUuid(applicationDto.applicationStatusUuid());
    InterviewStatus interviewStatus = interviewStatusService.findByUuidOrReturnNull(applicationDto.interviewStatusUuid());
    OfferStatus offerStatus = offerStatusService.findByUuidOrReturnNull(applicationDto.offerStatusUuid());
    ResponseStatus responseStatus = responseStatusService.findByUuidOrReturnNull(applicationDto.responseStatusUuid());
    FinalDestinationStatus finalDestinationStatus = finalDestinationStatusService.findByUuidOrReturnNull(applicationDto.finalDestinationStatusUuid());

    application.validateFields(applicationDto, applicationStatus, interviewStatus, offerStatus, responseStatus, finalDestinationStatus);
    application.updateStatusesByStudent(applicationStatus, interviewStatus, offerStatus, responseStatus, finalDestinationStatus);

    applicationRepository.save(application);

    String applicationCreatedBy = accountService.findByEmail(application.getCreatedBy()).getFullName();
    String applicationLastModifiedBy = accountService.findByEmail(application.getLastModifiedBy()).getFullName();

    return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
  }

  @Override
  @Transactional
  public void updateIsRemovableByUuid(String uuid) {
    applicationRepository.updateIsMarkedForDeletionByUuid(UUID.fromString(uuid));
  }

  @Override
  @Transactional(readOnly = true)
  public DashboardAggregateDataDto getAggregateData(Account account) {
    Student student = studentService.findByAccount(account);

    return new DashboardAggregateDataDto(
      student.getFirmChoiceDto(),
      student.getFinalDestinationDto(),
      student.countApplications(),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), ApplicationStatusType.PLANNED.getType())),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), ApplicationStatusType.SUBMITTED.getType())),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), ApplicationStatusType.WITHDRAWN.getType())),
      student.countApplicationsByDistinctFieldValues(Application::getCountry),
      student.countApplicationsByDistinctFieldValues(Application::getUniversity),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getInterviewStatus(), null)),
      student.countApplicationsByPredicate(element -> element.getOfferStatus() != null)
    );
  }
}
