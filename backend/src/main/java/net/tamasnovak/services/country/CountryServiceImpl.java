package net.tamasnovak.services.country;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.repositories.country.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {
  private final CountryRepository countryRepository;
  private final CountryMapper countryMapper;
  private final CountryServiceConstants countryServiceConstants;

  @Autowired
  public CountryServiceImpl(CountryMapper countryMapper, CountryRepository countryRepository, CountryServiceConstants countryServiceConstants) {
    this.countryMapper = countryMapper;
    this.countryRepository = countryRepository;
    this.countryServiceConstants = countryServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<CountryOptionDto> getOptionsSortedAscByName() {
    List<Country> countries = countryRepository.findAllByOrderByNameAsc();

    return countries.stream()
      .map(countryMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public Country findByUuid(UUID countryUuid) {
    return countryRepository.findByUuid(countryUuid)
      .orElseThrow(() -> new EntityNotFoundException(countryServiceConstants.COUNTRY_NOT_FOUND));
  }
}
