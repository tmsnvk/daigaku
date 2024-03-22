package net.tamasnovak.services.university;

import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundConstants;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import net.tamasnovak.repositories.UniversityRepository;
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
  private final UniversityMapper universityMapper;
  private final UniversityRepository universityRepository;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;

  @Autowired
  public UniversityServiceImpl(CountryService countryService, UniversityMapper universityMapper, UniversityRepository universityRepository, DbResourceNotFoundConstants dbResourceNotFoundConstants) {
    this.countryService = countryService;
    this.universityMapper = universityMapper;
    this.universityRepository = universityRepository;
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
  public University findByUuid(UUID universityId) {
    Optional<University> university = universityRepository.findByUuid(universityId);

    if (university.isEmpty()) {
      throw new DbResourceNotFoundException(dbResourceNotFoundConstants.UNIVERSITY_NOT_FOUND);
    }

    return university.get();
  }
}
