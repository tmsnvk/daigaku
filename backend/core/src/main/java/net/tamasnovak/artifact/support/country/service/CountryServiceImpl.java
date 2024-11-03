package net.tamasnovak.artifact.support.country.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.country.dto.CountryDropdownOption;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.persistence.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "CountryService")
public class CountryServiceImpl implements CountryService {
  private final CountryRepository countryRepository;
  private final GlobalServiceMessages globalServiceMessages;

  @Autowired
  public CountryServiceImpl(CountryRepository countryRepository, GlobalServiceMessages globalServiceMessages) {
    this.countryRepository = countryRepository;
    this.globalServiceMessages = globalServiceMessages;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountryByUuid", key = "{ #uuid }")
  public Country findByUuid(final UUID uuid) {
    return countryRepository.findByUuid(uuid)
                            .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountryDropdownOptions")
  public List<CountryDropdownOption> findAllSortedByName() {
    return countryRepository.findAllByOrderByNameAsc();
  }
}
