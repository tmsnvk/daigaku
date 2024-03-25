package net.tamasnovak.services.university;

import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundConstants;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import net.tamasnovak.repositories.university.UniversityRepository;
import net.tamasnovak.services.country.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UniversityServiceImpl implements UniversityService {
  private final CountryService countryService;
  private final UniversityRepository universityRepository;
  private final UniversityMapper universityMapper;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;

  @Autowired
  public UniversityServiceImpl(CountryService countryService, UniversityRepository universityRepository, UniversityMapper universityMapper, DbResourceNotFoundConstants dbResourceNotFoundConstants) {
    this.countryService = countryService;
    this.universityRepository = universityRepository;
    this.universityMapper = universityMapper;
    this.dbResourceNotFoundConstants = dbResourceNotFoundConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<UniversityOptionDto> getOptionsByCountryUuid(UUID countryUuid) {
    Country country = countryService.findByUuid(countryUuid);
    List<University> universities = universityRepository.findUniversitiesByCountryId(country);

    return universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public University findByUuid(UUID universityUuid) {
    Optional<University> university = universityRepository.findByUuid(universityUuid);

    if (university.isEmpty()) {
      throw new DbResourceNotFoundException(dbResourceNotFoundConstants.UNIVERSITY_NOT_FOUND);
    }

    return university.get();
  }
}
