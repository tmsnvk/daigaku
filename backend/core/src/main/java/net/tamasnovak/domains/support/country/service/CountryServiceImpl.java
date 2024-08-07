package net.tamasnovak.domains.support.country.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.domains.support.country.dto.CountrySelectOption;
import net.tamasnovak.domains.support.country.entity.Country;
import net.tamasnovak.domains.support.country.persistence.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "CountryService")
public class CountryServiceImpl implements CountryService {
  private final CountryRepository countryRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public CountryServiceImpl(CountryRepository countryRepository, GlobalServiceConstants globalServiceConstants) {
    this.countryRepository = countryRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountryByUuid", key = "{ #uuid }")
  public Country getByUuid(final String uuid) {
    return countryRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountrySelectOptions")
  public List<CountrySelectOption> getAllSelectOptions() {
    return countryRepository.findAllByOrderByNameAsc();
  }
}
