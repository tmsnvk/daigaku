package net.tamasnovak.artifact.support.country.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
import net.tamasnovak.artifact.support.country.dto.CountryDropdownOption;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.persistence.CountryRepository;
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
  public Country findByUuid(final UUID uuid) {
    return countryRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountryDropdownOptions")
  public List<CountryDropdownOption> findAllSortedByName() {
    return countryRepository.findAllByOrderByNameAsc();
  }
}
