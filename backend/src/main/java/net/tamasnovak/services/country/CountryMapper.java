package net.tamasnovak.services.country;

import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.entities.country.Country;
import org.springframework.stereotype.Component;

@Component
public final class CountryMapper {
  public CountryOptionDto toOptionDto(Country country) {
    return new CountryOptionDto(
      country.getUuid(),
      country.getName()
    );
  }
}
