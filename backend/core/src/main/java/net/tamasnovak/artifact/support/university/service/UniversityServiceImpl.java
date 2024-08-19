package net.tamasnovak.artifact.support.university.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import net.tamasnovak.artifact.support.university.dto.UniversitySelectOption;
import net.tamasnovak.artifact.support.university.entity.University;
import net.tamasnovak.artifact.support.university.persistence.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "UniversityService")
public class UniversityServiceImpl implements UniversityService {
  private final CountryService countryService;
  private final UniversityRepository universityRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public UniversityServiceImpl(CountryService countryService, UniversityRepository universityRepository, GlobalServiceConstants globalServiceConstants) {
    this.countryService = countryService;
    this.universityRepository = universityRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "UniversityByUuid", key = "{ #uuid }")
  public University getByUuid(final UUID uuid) {
    return universityRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "UniversitySelectOptionsByCountryUuid", key = "{ #countryUuid }")
  public List<UniversitySelectOption> getAllSelectOptionsByCountryUuid(final UUID countryUuid) {
    final Country country = countryService.getByUuid(countryUuid);

    return universityRepository.findByCountryOrderByNameAsc(country);
  }
}
