package net.tamasnovak.services.support.country;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.country.CountrySelectOptionView;
import net.tamasnovak.entities.support.country.Country;
import net.tamasnovak.repositories.support.country.CountryRepository;
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
@Qualifier(value = "CountryService")
public class CountryService implements CountryCoreService, SupportCoreService<Country> {
  private final CountryRepository countryRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public CountryService(CountryRepository countryRepository, GlobalServiceConstants globalServiceConstants) {
    this.countryRepository = countryRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  /*
   * CountryCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountrySelectOptionViews")
  public List<CountrySelectOptionView> getAllSelectOptionViews() {
    return countryRepository.findAllByOrderByNameAsc();
  }

  /*
   * SupportCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountryByUuid", key = "{ #root.methodName, #uuid }")
  public Country getByUuid(String uuid) {
    return countryRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
