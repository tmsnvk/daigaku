package net.tamasnovak.services.support.university;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.university.UniversitySelectOptionView;
import net.tamasnovak.entities.support.country.Country;
import net.tamasnovak.entities.support.university.University;
import net.tamasnovak.repositories.support.university.UniversityRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.support.SupportCoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "UniversityService")
public class UniversityService implements UniversityCoreService, SupportCoreService<University> {
  private final SupportCoreService<Country> countrySupportCoreService;
  private final UniversityRepository universityRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public UniversityService(@Qualifier("CountryService") SupportCoreService<Country> countrySupportCoreService, UniversityRepository universityRepository, GlobalServiceConstants globalServiceConstants) {
    this.countrySupportCoreService = countrySupportCoreService;
    this.universityRepository = universityRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  /*
   * UniversityCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "UniversitySelectOptionViewsByCountryUuid", key = "{ #root.methodName, #countryUuid }")
  public List<UniversitySelectOptionView> getAllSelectOptionViewsByCountryUuid(String countryUuid) {
    Country country = countrySupportCoreService.getByUuid(countryUuid);

    return universityRepository.findByCountryOrderByNameAsc(country);
  }

  /*
   * SupportCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "UniversityByUuid", key = "{ #root.methodName, #uuid }")
  public University getByUuid(String uuid) {
    return universityRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
