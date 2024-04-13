package net.tamasnovak.services.university;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.repositories.university.UniversityRepository;
import net.tamasnovak.services.country.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UniversityServiceImpl implements UniversityService {
  private final CountryService countryService;
  private final UniversityRepository universityRepository;
  private final UniversityMapper universityMapper;
  private final UniversityServiceConstants universityServiceConstants;

  @Autowired
  public UniversityServiceImpl(CountryService countryService, UniversityRepository universityRepository, UniversityMapper universityMapper, UniversityServiceConstants universityServiceConstants) {
    this.countryService = countryService;
    this.universityRepository = universityRepository;
    this.universityMapper = universityMapper;
    this.universityServiceConstants = universityServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<UniversityOptionDto> getOptionsByCountryUuidAndSortedAscByName(UUID countryUuid) {
    Country country = countryService.findByUuid(countryUuid);
    List<University> universities = universityRepository.findByCountryIdOrderByNameAsc(country);

    return universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public University findByUuid(UUID universityUuid) {
    return universityRepository.findByUuid(universityUuid)
      .orElseThrow(() -> new EntityNotFoundException(universityServiceConstants.UNIVERSITY_NOT_FOUND));
  }
}
