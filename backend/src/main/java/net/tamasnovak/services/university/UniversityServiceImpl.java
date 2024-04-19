package net.tamasnovak.services.university;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.projections.university.UniversityOptionView;
import net.tamasnovak.repositories.university.UniversityRepository;
import net.tamasnovak.services.country.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UniversityServiceImpl implements UniversityService {
  private final CountryService countryService;
  private final UniversityRepository universityRepository;
  private final UniversityConstants universityConstants;

  @Autowired
  public UniversityServiceImpl(CountryService countryService, UniversityRepository universityRepository, UniversityConstants universityConstants) {
    this.countryService = countryService;
    this.universityRepository = universityRepository;
    this.universityConstants = universityConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<UniversityOptionView> getOptionsByCountryUuidAndSortedAscByName(UUID countryUuid) {
    Country country = countryService.findByUuid(countryUuid);

    return universityRepository.findByCountryOrderByNameAsc(country);
  }

  @Override
  @Transactional(readOnly = true)
  public University findByUuid(UUID universityUuid) {
    return universityRepository.findByUuid(universityUuid)
      .orElseThrow(() -> new EntityNotFoundException(universityConstants.UNIVERSITY_NOT_FOUND));
  }
}
