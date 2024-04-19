package net.tamasnovak.services.country;

import net.tamasnovak.entities.country.Country;
import net.tamasnovak.projections.option.GenericOptionView;

import java.util.List;
import java.util.UUID;

public interface CountryService {
  List<GenericOptionView> getOptionsSortedAscByName();
  Country findByUuid(UUID countryUuid);
}
