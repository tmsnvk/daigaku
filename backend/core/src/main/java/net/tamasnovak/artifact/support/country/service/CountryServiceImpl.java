/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.country.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.country.dto.CountrySelectOption;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.persistence.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Country} entity-related API operations, implementing {@link CountryService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "CountryService")
public class CountryServiceImpl implements CountryService {
  private final CountryRepository countryRepository;

  @Autowired
  public CountryServiceImpl(CountryRepository countryRepository) {
    this.countryRepository = countryRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountryByUuid", key = "{ #countryUuid }")
  public Country findCountryByUuid(final UUID countryUuid) {
    return countryRepository.findCountryByUuid(countryUuid)
                            .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountrySelectOptions")
  public List<CountrySelectOption> findCountrySelectOptionsSortedByName() {
    return countryRepository.findCountriesByOrderByNameAsc();
  }
}
