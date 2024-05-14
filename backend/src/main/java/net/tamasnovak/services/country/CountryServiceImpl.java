package net.tamasnovak.services.country;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.country.CountryOptionView;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.repositories.country.CountryRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
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
  public List<CountryOptionView> getSelectOptions() {
    return countryRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public Country getCountryByUuid(String uuid) {
    return countryRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
