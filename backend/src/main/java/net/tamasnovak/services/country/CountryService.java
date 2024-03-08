package net.tamasnovak.services.country;

import lombok.RequiredArgsConstructor;
import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.entities.Country;
import net.tamasnovak.repositories.CountryRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public final class CountryService {
  private final CountryMapper countryMapper;
  private final CountryRepository countryRepository;

  public List<CountryOptionDto> findAll() {
    List<Country> countries = countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));

    return countries.stream()
      .map(countryMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  public Optional<Country> findByUuid(UUID countryId) {
    return countryRepository.findByUuid(countryId);
  }
}
