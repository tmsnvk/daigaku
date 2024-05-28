package net.tamasnovak.services.support.university;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.university.UniversitySelectOptionView;
import net.tamasnovak.entities.support.country.Country;
import net.tamasnovak.entities.support.university.University;
import net.tamasnovak.repositories.support.university.UniversityRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.support.country.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
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
  @Cacheable(value = "UniversitySelectOptionViewsByCountryUuid", key = "{ #root.methodName, #countryUuid }")
  public List<UniversitySelectOptionView> getAllSelectOptionViewsByCountryUuid(String countryUuid) {
    Country country = countryService.getByUuid(countryUuid);

    return universityRepository.findByCountryOrderByNameAsc(country);
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "UniversityByUuid", key = "{ #root.methodName, #uuid }")
  public University getByUuid(String uuid) {
    return universityRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
