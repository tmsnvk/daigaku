package net.tamasnovak.services.country;

import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundConstants;
import net.tamasnovak.exceptions.dbReourceNotFound.DbResourceNotFoundException;
import net.tamasnovak.repositories.country.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {
  private final CountryRepository countryRepository;
  private final CountryMapper countryMapper;
  private final DbResourceNotFoundConstants dbResourceNotFoundConstants;

  @Autowired
  public CountryServiceImpl(CountryMapper countryMapper, CountryRepository countryRepository, DbResourceNotFoundConstants dbResourceNotFoundConstants) {
    this.countryMapper = countryMapper;
    this.countryRepository = countryRepository;
    this.dbResourceNotFoundConstants = dbResourceNotFoundConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<CountryOptionDto> getOptions() {
    List<Country> countries = countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));

    return countries.stream()
      .map(countryMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public Country findByUuid(UUID countryUuid) {
    Optional<Country> country = countryRepository.findByUuid(countryUuid);

    if (country.isEmpty()) {
      throw new DbResourceNotFoundException(dbResourceNotFoundConstants.COUNTRY_NOT_FOUND);
    }

    return country.get();
  }
}
