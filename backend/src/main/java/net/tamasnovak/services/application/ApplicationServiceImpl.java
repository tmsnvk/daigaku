package net.tamasnovak.services.application;

import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewSubmittedApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.account.accountsByRole.Student;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundConstants;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.account.accountsStudentsJunction.AccountsStudentsJunctionService;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {
  private final ApplicationStatusService applicationStatusService;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final AccountsStudentsJunctionService accountsStudentsJunctionService;
  private final ApplicationRepository applicationRepository;
  private final ApplicationMapper applicationMapper;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;

  @Autowired
  public ApplicationServiceImpl(ApplicationStatusService applicationStatusService, CountryService countryService, UniversityService universityService, AccountsStudentsJunctionService accountsStudentsJunctionService, ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, DbResourceNotFoundConstants dbResourceNotFoundConstants) {
    this.applicationStatusService = applicationStatusService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.accountsStudentsJunctionService = accountsStudentsJunctionService;
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.dbResourceNotFoundConstants = dbResourceNotFoundConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<NewApplicationDto> findAllByStudentAccount(Student student) {
    List<Application> applications = getAllByStudentAccount(student);

    return applications.stream()
      .map(applicationMapper::toApplicationDto)
      .collect(Collectors.toList());
  }

  private List<Application> getAllByStudentAccount(Student student) {
    return applicationRepository.findApplicationsByStudentId(student);
  }

  @Override
  @Transactional
  public NewApplicationDto saveNewApplicationByStudent(Account account, NewSubmittedApplicationDto newSubmittedApplicationDto) {
    Country country = countryService.findByUuid(newSubmittedApplicationDto.country());
    University university = universityService.findByUuid(newSubmittedApplicationDto.university());

    checkIfUniversityBelongsToCountry(country, university);

    ApplicationStatus plannedApplicationStatus = applicationStatusService.findByName("PLANNED");

    Student student = accountsStudentsJunctionService.findStudentByAccountId(account);

    Application application = Application.createNewApplicationByStudent(
      student,
      country,
      university,
      newSubmittedApplicationDto.courseName(),
      newSubmittedApplicationDto.minorSubject(),
      newSubmittedApplicationDto.programmeLength(),
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
  @Transactional(readOnly = true)
  public DashboardDataDto getDashboardData(long accountId, String accountRole) {
    DashboardDataDto dashboardDataDto = null;

    if (accountRole.equals("ROLE_STUDENT")) {
      dashboardDataDto = getStudentDashboardData(accountId);
    }

    return dashboardDataDto;
  }

  private DashboardDataDto getStudentDashboardData(long accountId) {
    DashboardDataDto dashboardDataDto = null;

    List<Object[]> dashboardData = applicationRepository.getStudentDashboardData(accountId);

    for (Object[] result : dashboardData) {
      dashboardDataDto = new DashboardDataDto(
        (String) result[0],
        (String) result[1],
        (String) result[2],
        (String) result[3],
        (String) result[4],
        (String) result[5],
        (long) result[6],
        (long) result[7],
        (long) result[8],
        (long) result[9],
        (long) result[10],
        (long) result[11],
        (long) result[12],
        (long) result[13]
      );
    }

    return dashboardDataDto;
  }
}
