package net.tamasnovak.services.country;

import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.entities.Country;
import org.springframework.stereotype.Component;

@Component
final class CountryMapper {
  public CountryOptionDto toOptionDto(Country country) {
    return new CountryOptionDto(
      country.getUuid(),
      country.getName()
    );
  }
}
