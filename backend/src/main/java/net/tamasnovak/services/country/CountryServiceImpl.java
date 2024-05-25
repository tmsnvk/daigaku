package net.tamasnovak.services.country;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.country.CountrySelectOptionView;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.repositories.country.CountryRepository;
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
  @Cacheable(value = "countrySelectOptionViews")
  public List<CountrySelectOptionView> getAllSelectOptionViews() {
    return countryRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "country", key = "#uuid")
  public Country getCountryByUuid(String uuid) {
    return countryRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
