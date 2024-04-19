package net.tamasnovak.services.application.studentApplication;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.application.ApplicationMapper;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.offerStatus.OfferStatusService;
import net.tamasnovak.services.responseStatus.ResponseStatusService;
import net.tamasnovak.services.role.student.StudentService;
import net.tamasnovak.services.university.UniversityService;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentApplicationServiceImpl implements StudentApplicationService {
  private final AccountService accountService;
  private final StudentService studentService;
  private final CountryService countryService;
  private final UniversityService universityService;
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
  public StudentApplicationServiceImpl(AccountService accountService, StudentService studentService, CountryService countryService, UniversityService universityService, ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ValidatorUtilities validatorUtilities, StudentApplicationConstants studentApplicationConstants) {
    this.accountService = accountService;
    this.studentService = studentService;
    this.countryService = countryService;
    this.universityService = universityService;
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
  public List<ApplicationDto> findAllByAccount(Account account) {
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
  public ApplicationDto createApplication(Account account, NewApplicationByStudentDto newApplicationByStudentDto) {
    UUID validCountryUuid = validatorUtilities.validateIfStringIsUuid(newApplicationByStudentDto.countryUuid());
    UUID validUniversityUuid = validatorUtilities.validateIfStringIsUuid(newApplicationByStudentDto.universityUuid());

    Country country = countryService.findByUuid(validCountryUuid);
    University university = universityService.findByUuid(validUniversityUuid);

    country.checkIfUniversityBelongsToCountry(university, studentApplicationConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);

    Student student = studentService.findByAccount(account);
    ApplicationStatus plannedApplicationStatus = applicationStatusService.findByName("Planned");

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
  public ApplicationDto updateByUuid(Account account, String uuid, UpdateApplicationByStudentDto updateApplicationByStudentDto) {
    UUID validApplicationUuid = validatorUtilities.validateIfStringIsUuid(uuid);

    Application application = applicationRepository.findByUuid(validApplicationUuid)
      .orElseThrow(() -> new EntityNotFoundException(studentApplicationConstants.NO_APPLICATION_FOUND));

    validatorUtilities.checkIfUuidsAreEqual(
      account.getUuid(),
      application.getStudent().getAccount().getUuid(),
      studentApplicationConstants.NO_PERMISSION_AS_STUDENT
    );

    ApplicationStatus applicationStatus = applicationStatusService.findByUuid(updateApplicationByStudentDto.applicationStatusUuid());
    InterviewStatus interviewStatus = interviewStatusService.findByUuid(updateApplicationByStudentDto.interviewStatusUuid());
    OfferStatus offerStatus = offerStatusService.findByUuid(updateApplicationByStudentDto.offerStatusUuid());
    ResponseStatus responseStatus = responseStatusService.findByUuid(updateApplicationByStudentDto.responseStatusUuid());
    FinalDestinationStatus finalDestinationStatus = finalDestinationStatusService.findByUuid(updateApplicationByStudentDto.finalDestinationStatusUuid());

    application.updateStatusesByStudent(applicationStatus, interviewStatus, offerStatus, responseStatus, finalDestinationStatus);

    applicationRepository.save(application);

    String applicationCreatedBy = accountService.findByEmail(application.getCreatedBy()).getFullName();
    String applicationLastModifiedBy = accountService.findByEmail(application.getLastModifiedBy()).getFullName();

    return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
  }

  @Override
  @Transactional(readOnly = true)
  public DashboardAggregateDataDto getDashboardData(Account account) {
    Student student = studentService.findByAccount(account);

    return new DashboardAggregateDataDto(
      student.getFirmChoiceApplication(),
      student.getFinalDestinationApplication(),
      student.countApplications(),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), "Planned")),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), "Submitted")),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getApplicationStatus().getName(), "Withdrawn")),
      student.countApplicationsByDistinctFieldValues(Application::getCountry),
      student.countApplicationsByDistinctFieldValues(Application::getUniversity),
      student.countApplicationsByPredicate(element -> Objects.equals(element.getInterviewStatus(), null)),
      student.countApplicationsByPredicate(element -> element.getOfferStatus() != null)
    );
  }
}
