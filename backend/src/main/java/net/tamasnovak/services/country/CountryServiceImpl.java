package net.tamasnovak.services.country;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.projections.option.GenericOptionView;
import net.tamasnovak.repositories.country.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CountryServiceImpl implements CountryService {
  private final CountryRepository countryRepository;
  private final CountryConstants countryConstants;

  @Autowired
  public CountryServiceImpl(CountryRepository countryRepository, CountryConstants countryConstants) {
    this.countryRepository = countryRepository;
    this.countryConstants = countryConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<GenericOptionView> getOptionsSortedAscByName() {
    return countryRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public Country findByUuid(UUID countryUuid) {
    return countryRepository.findByUuid(countryUuid)
      .orElseThrow(() -> new EntityNotFoundException(countryConstants.COUNTRY_NOT_FOUND));
  }
}
