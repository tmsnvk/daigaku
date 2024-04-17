package net.tamasnovak.services.application.studentApplication;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.FinalDestinationDto;
import net.tamasnovak.dtos.application.response.FirmChoiceDto;
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
import net.tamasnovak.repositories.account.AccountRepository;
import net.tamasnovak.repositories.application.ApplicationRepository;
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
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentApplicationServiceImpl implements StudentApplicationService {
  private final ApplicationStatusService applicationStatusService;
  private final InterviewStatusService interviewStatusService;
  private final OfferStatusService offerStatusService;
  private final ResponseStatusService responseStatusService;
  private final FinalDestinationStatusService finalDestinationStatusService;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final ApplicationRepository applicationRepository;
  private final ApplicationMapper applicationMapper;
  private final ValidatorUtilities validatorUtilities;
  private final StudentApplicationServiceConstants studentApplicationServiceConstants;
  private final StudentService studentService;
  private final AccountRepository accountRepository;

  @Autowired
  public StudentApplicationServiceImpl(ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, CountryService countryService, UniversityService universityService, ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ValidatorUtilities validatorUtilities, StudentApplicationServiceConstants studentApplicationServiceConstants, StudentService studentService, AccountRepository accountRepository) {
    this.applicationStatusService = applicationStatusService;
    this.interviewStatusService = interviewStatusService;
    this.offerStatusService = offerStatusService;
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.validatorUtilities = validatorUtilities;
    this.studentApplicationServiceConstants = studentApplicationServiceConstants;
    this.studentService = studentService;
    this.accountRepository = accountRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public List<ApplicationDto> findAllByAccount(Account account) {
    Student student = studentService.findByAccount(account);
    List<Application> applications = applicationRepository.findApplicationsByStudent(student);

    return applications.stream()
      .map((application) -> {
        String applicationCreatedBy = getApplicationCreatedBy(application.getCreatedBy());
        String applicationLastModifiedBy = getApplicationLastModifiedBy(application.getLastModifiedBy());

        return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
      })
      .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public ApplicationDto createApplication(Account account, NewApplicationByStudentDto newApplicationByStudentDto) {
    UUID validCountryUuid = validatorUtilities.validateIfStringIsUuid(newApplicationByStudentDto.countryUuid(), studentApplicationServiceConstants.NO_RECORD_FOUND);
    UUID validUniversityUuid = validatorUtilities.validateIfStringIsUuid(newApplicationByStudentDto.universityUuid(), studentApplicationServiceConstants.NO_RECORD_FOUND);

    Country country = countryService.findByUuid(validCountryUuid);
    University university = universityService.findByUuid(validUniversityUuid);
    checkIfUniversityBelongsToCountry(country, university);

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

    String applicationCreatedBy = getApplicationCreatedBy(application.getCreatedBy());
    String applicationLastModifiedBy = getApplicationLastModifiedBy(application.getLastModifiedBy());

    return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
  }

  private void checkIfUniversityBelongsToCountry(Country country, University university) {
    if (!country.getUniversities().contains(university)) {
      throw new EntityNotFoundException(studentApplicationServiceConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);
    }
  }

  @Override
  @Transactional
  public ApplicationDto updateByUuid(Account account, String uuid, UpdateApplicationByStudentDto updateApplicationByStudentDto) {
    UUID validApplicationUuid = validatorUtilities.validateIfStringIsUuid(uuid, studentApplicationServiceConstants.NO_APPLICATION_FOUND);

    Application application = applicationRepository.findByUuid(validApplicationUuid)
      .orElseThrow(() -> new EntityNotFoundException(studentApplicationServiceConstants.NO_APPLICATION_FOUND));

    validatorUtilities.checkIfUuidsAreEqual(
      account.getUuid(),
      application.getStudent().getAccount().getUuid(),
      studentApplicationServiceConstants.NO_PERMISSION_AS_STUDENT
    );

    ApplicationStatus applicationStatus = applicationStatusService.findByUuid(updateApplicationByStudentDto.applicationStatusUuid());
    InterviewStatus interviewStatus = interviewStatusService.findByUuid(updateApplicationByStudentDto.interviewStatusUuid());
    OfferStatus offerStatus = offerStatusService.findByUuid(updateApplicationByStudentDto.offerStatusUuid());
    ResponseStatus responseStatus = responseStatusService.findByUuid(updateApplicationByStudentDto.responseStatusUuid());
    FinalDestinationStatus finalDestinationStatus = finalDestinationStatusService.findByUuid(updateApplicationByStudentDto.finalDestinationStatusUuid());

    application.setApplicationStatus(applicationStatus);
    application.setInterviewStatus(interviewStatus);
    application.setOfferStatus(offerStatus);
    application.setResponseStatus(responseStatus);
    application.setFinalDestinationStatus(finalDestinationStatus);

    applicationRepository.save(application);

    String applicationCreatedBy = getApplicationCreatedBy(application.getCreatedBy());
    String applicationLastModifiedBy = getApplicationLastModifiedBy(application.getLastModifiedBy());

    return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
  }

  @Override
  @Transactional(readOnly = true)
  public DashboardAggregateDataDto getDashboardData(Account account, String accountRole) {
    Student student = studentService.findByAccount(account);

    return prepareDashboardData(student);
  }

  private DashboardAggregateDataDto prepareDashboardData(Student student) {
    ApplicationStatus plannedStatus = applicationStatusService.findByName("Planned");
    ApplicationStatus submittedStatus = applicationStatusService.findByName("Submitted");
    ApplicationStatus withdrawnStatus = applicationStatusService.findByName("Withdrawn");

    ResponseStatus firmChoiceStatus = responseStatusService.findByName("Firm Choice");
    Application applicationByFirmChoice = applicationRepository.findByStudentAndResponseStatus(student, firmChoiceStatus);

    FirmChoiceDto firmChoiceDto = new FirmChoiceDto(
      applicationByFirmChoice.getCountry().getName(),
      applicationByFirmChoice.getUniversity().getName(),
      applicationByFirmChoice.getCourseName()
    );

    FinalDestinationStatus finalDestinationStatus = finalDestinationStatusService.findByName("Final Destination");
    Application applicationByFinalDestinationStatus = applicationRepository.findByStudentAndFinalDestinationStatus(student, finalDestinationStatus);

    FinalDestinationDto finalDestinationDto = new FinalDestinationDto(
      applicationByFinalDestinationStatus.getCountry().getName(),
      applicationByFinalDestinationStatus.getUniversity().getName(),
      applicationByFinalDestinationStatus.getCourseName()
    );

    return new DashboardAggregateDataDto(
      firmChoiceDto,
      finalDestinationDto,
      applicationRepository.countAllByStudent(student),
      applicationRepository.countAllByStudentAndApplicationStatus(student, plannedStatus),
      applicationRepository.countAllByStudentAndApplicationStatus(student, submittedStatus),
      applicationRepository.countAllByStudentAndApplicationStatus(student, withdrawnStatus),
      applicationRepository.countDistinctByCountryIdAndStudentId(student.getId()),
      applicationRepository.countDistinctByUniversityIdAndStudentId(student.getId()),
      applicationRepository.countByStudentAndInterviewStatusIsNull(student),
      applicationRepository.countAllByStudentAndOfferStatusIsNotNull(student)
      );
  }

  private String getApplicationCreatedBy(String createdByEmail) {
    return accountRepository.findByEmail(createdByEmail)
      .orElseThrow(() -> new EntityNotFoundException(studentApplicationServiceConstants.NO_RECORD_FOUND))
      .getFullName();
  }

  private String getApplicationLastModifiedBy(String lastModifiedByEmail) {
    return accountRepository.findByEmail(lastModifiedByEmail)
      .orElseThrow(() -> new EntityNotFoundException(studentApplicationServiceConstants.NO_RECORD_FOUND))
      .getFullName();
  }
}
