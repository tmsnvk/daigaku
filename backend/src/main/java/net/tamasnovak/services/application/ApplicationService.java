package net.tamasnovak.services.application;

import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.dbReourseNotFound.DbResourceNotFoundException;
import net.tamasnovak.exceptions.dbReourseNotFound.DbResourceNotFoundMessages;
import net.tamasnovak.repositories.ApplicationRepository;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public final class ApplicationService {
  private final ApplicationRepository applicationRepository;
  private final CountryService countryService;
  private final UniversityService universityService;
  private final ApplicationMapper applicationMapper;
  private final DbResourceNotFoundMessages dbResourceNotFoundMessages;

  public ApplicationService(ApplicationRepository applicationRepository, CountryService countryService, UniversityService universityService, ApplicationMapper applicationMapper, DbResourceNotFoundMessages dbResourceNotFoundMessages) {
    this.applicationRepository = applicationRepository;
    this.countryService = countryService;
    this.universityService = universityService;
    this.applicationMapper = applicationMapper;
    this.dbResourceNotFoundMessages = dbResourceNotFoundMessages;
  }

  public List<ApplicationDto> findAll(Account account) {
    List<Application> applications = applicationRepository.findAllByAccountId(account).get();

    return applications.stream()
      .map(applicationMapper::toApplicationDto)
      .collect(Collectors.toList());
  }

  public ApplicationDto saveApplication(Account account, NewApplicationDto newApplicationDto) {
    Country country = countryService.findByUuid(newApplicationDto.country())
      .orElseThrow(() -> new DbResourceNotFoundException(dbResourceNotFoundMessages.COUNTRY_NOT_FOUND));
    University university = universityService.findByUuid(newApplicationDto.university())
      .orElseThrow(() -> new DbResourceNotFoundException(dbResourceNotFoundMessages.UNIVERSITY_NOT_FOUND));

    Application application = new Application(
      account,
      country,
      university,
      newApplicationDto.majorSubject(),
      newApplicationDto.minorSubject(),
      newApplicationDto.programmeLength()
    );

    applicationRepository.save(application);

    return applicationMapper.toApplicationDto(application);
  }
}
