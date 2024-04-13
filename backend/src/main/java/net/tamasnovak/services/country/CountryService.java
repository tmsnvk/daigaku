package net.tamasnovak.services.country;

import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.entities.country.Country;

import java.util.List;
import java.util.UUID;

public interface CountryService {
  List<CountryOptionDto> getOptionsSortedAscByName();
  Country findByUuid(UUID countryUuid);
}
