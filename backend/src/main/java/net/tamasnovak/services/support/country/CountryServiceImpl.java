package net.tamasnovak.services.support.country;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.country.CountrySelectOptionDto;
import net.tamasnovak.entities.support.country.Country;
import net.tamasnovak.repositories.support.country.CountryRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
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
  @Cacheable(value = "CountrySelectOptionViews")
  public List<CountrySelectOptionDto> getAllSelectOptionViews() {
    return countryRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "CountryByUuid", key = "{ #root.methodName, #uuid }")
  public Country getByUuid(String uuid) {
    return countryRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
