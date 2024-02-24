package net.tamasnovak.services.country;

import net.tamasnovak.entities.Country;
import net.tamasnovak.repositories.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CountryService {
  private final CountryRepository countryRepository;

  @Autowired
  public CountryService(CountryRepository countryRepository) {
    this.countryRepository = countryRepository;
  }

  public List<Country> findAll() {
    return countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
  }

  public Optional<Country> findByUuid(UUID countryId) {
    return countryRepository.findByUuid(countryId);
  }
}
