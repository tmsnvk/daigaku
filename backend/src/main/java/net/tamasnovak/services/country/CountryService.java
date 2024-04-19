package net.tamasnovak.services.country;

import net.tamasnovak.entities.country.Country;
import net.tamasnovak.projections.country.CountryOptionView;

import java.util.List;
import java.util.UUID;

public interface CountryService {
  List<CountryOptionView> getDropdownOptionsSortedAscByName();
  Country findByUuid(UUID countryUuid);
}
