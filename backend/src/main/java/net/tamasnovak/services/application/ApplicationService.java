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
import net.tamasnovak.repositories.ApplicationStatusRepository;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public final class ApplicationService {
  private final ApplicationRepository applicationRepository;
  private final ApplicationStatusService applicationStatusService;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final ApplicationMapper applicationMapper;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;

  public ApplicationService(ApplicationRepository applicationRepository, ApplicationStatusRepository applicationStatusRepository, ApplicationStatusService applicationStatusService, CountryService countryService, UniversityService universityService, ApplicationMapper applicationMapper, DbResourceNotFoundConstants dbResourceNotFoundConstants) {
    this.applicationRepository = applicationRepository;
    this.applicationStatusService = applicationStatusService;
    this.countryService = countryService;
    this.universityService = universityService;
    this.applicationMapper = applicationMapper;
    this.dbResourceNotFoundConstants = dbResourceNotFoundConstants;
  }

  public List<NewApplicationDto> findAll(Account account) {
    List<Application> applications = applicationRepository.findAllByAccountId(account).get();

    return applications.stream()
      .map(applicationMapper::toApplicationDto)
      .collect(Collectors.toList());
  }

  public NewApplicationDto saveApplication(Account account, NewSubmittedApplicationDto newSubmittedApplicationDto) {
    Country country = countryService.findByUuid(newSubmittedApplicationDto.country())
      .orElseThrow(() -> new DbResourceNotFoundException(dbResourceNotFoundConstants.COUNTRY_NOT_FOUND));
    University university = universityService.findByUuid(newSubmittedApplicationDto.university())
      .orElseThrow(() -> new DbResourceNotFoundException(dbResourceNotFoundConstants.UNIVERSITY_NOT_FOUND));
    ApplicationStatus applicationStatus = applicationStatusService.findByName("PLANNED");

    Application application = Application.createNewApplication(
      account,
      country,
      university,
      newSubmittedApplicationDto.majorSubject(),
      newSubmittedApplicationDto.minorSubject(),
      applicationStatus,
      newSubmittedApplicationDto.programmeLength()
    );

    applicationRepository.save(application);

    return applicationMapper.toApplicationDto(application);
  }

  public DashboardDataDto getDashboardData(long accountId, String accountRole) {
    DashboardDataDto dashboardDataDto = null;

    if (accountRole.equals("ROLE_STUDENT")) {
      dashboardDataDto = getStudentDashboardData(accountId);
    }

    return dashboardDataDto;
  }

  public DashboardDataDto getStudentDashboardData(long accountId) {
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
