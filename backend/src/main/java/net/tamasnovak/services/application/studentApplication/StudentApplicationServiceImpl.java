package net.tamasnovak.services.application.studentApplication;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.response.FinalDestinationDto;
import net.tamasnovak.dtos.application.response.FirmChoiceDto;
import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Student;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundConstants;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.account.accountsStudentsJunction.AccountsStudentsJunctionService;
import net.tamasnovak.services.application.ApplicationMapper;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.finalDestinationStatus.FinalDestinationStatusService;
import net.tamasnovak.services.interviewStatus.InterviewStatusService;
import net.tamasnovak.services.offerStatus.OfferStatusService;
import net.tamasnovak.services.responseStatus.ResponseStatusService;
import net.tamasnovak.services.university.UniversityService;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
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
  private final AccountsStudentsJunctionService accountsStudentsJunctionService;
  private final ApplicationRepository applicationRepository;
  private final ApplicationMapper applicationMapper;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;
  private final ValidatorUtilities validatorUtilities;
  private final StudentApplicationServiceConstants studentApplicationServiceConstants;

  @Autowired
  public StudentApplicationServiceImpl(ApplicationStatusService applicationStatusService, InterviewStatusService interviewStatusService, OfferStatusService offerStatusService, ResponseStatusService responseStatusService, FinalDestinationStatusService finalDestinationStatusService, CountryService countryService, UniversityService universityService, AccountsStudentsJunctionService accountsStudentsJunctionService, ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, DbResourceNotFoundConstants dbResourceNotFoundConstants, ValidatorUtilities validatorUtilities, StudentApplicationServiceConstants studentApplicationServiceConstants) {
    this.applicationStatusService = applicationStatusService;
    this.interviewStatusService = interviewStatusService;
    this.offerStatusService = offerStatusService;
    this.responseStatusService = responseStatusService;
    this.finalDestinationStatusService = finalDestinationStatusService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.accountsStudentsJunctionService = accountsStudentsJunctionService;
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.dbResourceNotFoundConstants = dbResourceNotFoundConstants;
    this.validatorUtilities = validatorUtilities;
    this.studentApplicationServiceConstants = studentApplicationServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<ApplicationDto> findAllByAccount(Account studentAccount) {
    Student student = accountsStudentsJunctionService.findStudentByAccount(studentAccount);

    List<Application> applications = applicationRepository.findApplicationsByStudentId(student);

    return applications.stream()
      .map(applicationMapper::toApplicationDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public ApplicationDto createApplication(Account studentAccount, NewApplicationByStudentDto newApplicationByStudentDto) {
    Student student = accountsStudentsJunctionService.findStudentByAccount(studentAccount);
    Country country = countryService.findByUuid(newApplicationByStudentDto.countryUuid());
    University university = universityService.findByUuid(newApplicationByStudentDto.universityUuid());

    checkIfUniversityBelongsToCountry(country, university);

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

    return applicationMapper.toApplicationDto(application);
  }

  private void checkIfUniversityBelongsToCountry(Country country, University university) {
    if (!country.getUniversities().contains(university)) {
      throw new DbResourceNotFoundException(dbResourceNotFoundConstants.UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY);
    }
  }

  @Override
  @Transactional
  public ApplicationDto updateByUuid(Account account, String uuid, UpdateApplicationByStudentDto updateApplicationByStudentDto) {
    UUID validApplicationUuid = validatorUtilities.validateIfStringIsUuid(uuid, studentApplicationServiceConstants.NO_APPLICATION_FOUND);

    Application application = applicationRepository.findByUuid(validApplicationUuid)
      .orElseThrow(() -> new EntityNotFoundException(studentApplicationServiceConstants.NO_APPLICATION_FOUND));

    validatorUtilities.checkIfUuidsAreEqual(account.getUuid(), application.getStudentId().getAccountId().getUuid(), studentApplicationServiceConstants.NO_PERMISSION_AS_STUDENT);

    ApplicationStatus applicationStatus = applicationStatusService.findByUuid(updateApplicationByStudentDto.applicationStatusUuid());
    InterviewStatus interviewStatus = interviewStatusService.findByUuid(updateApplicationByStudentDto.interviewStatusUuid());
    OfferStatus offerStatus = offerStatusService.findByUuid(updateApplicationByStudentDto.offerStatusUuid());
    ResponseStatus responseStatus = responseStatusService.findByUuid(updateApplicationByStudentDto.responseStatusUuid());
    FinalDestinationStatus finalDestinationStatus = finalDestinationStatusService.findByUuid(updateApplicationByStudentDto.finalDestinationStatusUuid());

    application.setApplicationStatusId(applicationStatus);
    application.setInterviewStatusId(interviewStatus);
    application.setOfferStatusId(offerStatus);
    application.setResponseStatusId(responseStatus);
    application.setFinalDestinationStatusId(finalDestinationStatus);
    application.setLastUpdatedAt(new Timestamp(System.currentTimeMillis()));

    applicationRepository.save(application);

    return applicationMapper.toApplicationDto(application);
  }

  @Override
  @Transactional(readOnly = true)
  public DashboardAggregateDataDto getDashboardData(Account account, String accountRole) {
    Student student = accountsStudentsJunctionService.findStudentByAccount(account);

    return prepareDashboardData(student);
  }

  private DashboardAggregateDataDto prepareDashboardData(Student student) {
    ApplicationStatus plannedStatus = applicationStatusService.findByName("Planned");
    ApplicationStatus submittedStatus = applicationStatusService.findByName("Submitted");
    ApplicationStatus withdrawnStatus = applicationStatusService.findByName("Withdrawn");

    ResponseStatus firmChoiceStatus = responseStatusService.findByName("Firm Choice");
    Application applicationByFirmChoice = applicationRepository.findByStudentIdAndResponseStatusId(student, firmChoiceStatus);

    FirmChoiceDto firmChoiceDto = new FirmChoiceDto(
      applicationByFirmChoice.getCountryId().getName(),
      applicationByFirmChoice.getUniversityId().getName(),
      applicationByFirmChoice.getCourseName()
    );

    FinalDestinationStatus finalDestinationStatus = finalDestinationStatusService.findByName("Final Destination");
    Application applicationByFinalDestinationStatus = applicationRepository.findByStudentIdAndFinalDestinationStatusId(student, finalDestinationStatus);

    FinalDestinationDto finalDestinationDto = new FinalDestinationDto(
      applicationByFinalDestinationStatus.getCountryId().getName(),
      applicationByFinalDestinationStatus.getUniversityId().getName(),
      applicationByFinalDestinationStatus.getCourseName()
    );

    return new DashboardAggregateDataDto(
      firmChoiceDto,
      finalDestinationDto,
      applicationRepository.countAllByStudentId(student),
      applicationRepository.countAllByStudentIdAndApplicationStatusId(student, plannedStatus),
      applicationRepository.countAllByStudentIdAndApplicationStatusId(student, submittedStatus),
      applicationRepository.countAllByStudentIdAndApplicationStatusId(student, withdrawnStatus),
      applicationRepository.countDistinctByCountryIdAndStudentId(student.getId()),
      applicationRepository.countDistinctByUniversityIdAndStudentId(student.getId()),
      applicationRepository.countByStudentIdAndInterviewStatusIdIsNull(student),
      applicationRepository.countAllByStudentIdAndOfferStatusIdIsNotNull(student)
      );
  }
}
