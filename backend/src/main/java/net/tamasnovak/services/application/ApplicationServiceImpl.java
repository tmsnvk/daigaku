package net.tamasnovak.services.application;

import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewSubmittedApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundConstants;
import net.tamasnovak.repositories.ApplicationRepository;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {
  private final ApplicationRepository applicationRepository;
  private final ApplicationStatusService applicationStatusService;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final ApplicationMapper applicationMapper;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;

  @Autowired
  public ApplicationServiceImpl(ApplicationRepository applicationRepository, ApplicationStatusService applicationStatusService, CountryService countryService, UniversityService universityService, ApplicationMapper applicationMapper, DbResourceNotFoundConstants dbResourceNotFoundConstants) {
    this.applicationRepository = applicationRepository;
    this.applicationStatusService = applicationStatusService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.applicationMapper = applicationMapper;
    this.dbResourceNotFoundConstants = dbResourceNotFoundConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<NewApplicationDto> findAllByAccountAndRole(Account account) {
    List<Application> applications = new ArrayList<>();

    if (Objects.equals(account.getRole().getName(), "ROLE_STUDENT")) {
      applications = getAllByStudentAccount(account);
    }

    return applications.stream()
      .map(applicationMapper::toApplicationDto)
      .collect(Collectors.toList());
  }

  private List<Application> getAllByStudentAccount(Account account) {
    return applicationRepository.findAllByAccountId(account);
  }

  @Override
  @Transactional
  public NewApplicationDto saveNewApplicationByStudent(Account account, NewSubmittedApplicationDto newSubmittedApplicationDto) {
    Country country = countryService.findByUuid(newSubmittedApplicationDto.country());
    University university = universityService.findByUuid(newSubmittedApplicationDto.university());

    checkIfUniversityBelongsToCountry(country, university);

    ApplicationStatus plannedApplicationStatus = applicationStatusService.findByName("PLANNED");

    Application application = Application.createNewApplicationByStudent(
      account,
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
