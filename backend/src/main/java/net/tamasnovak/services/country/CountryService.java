package net.tamasnovak.services.country;

import net.tamasnovak.entities.country.Country;
import net.tamasnovak.dtos.country.CountryOptionView;

import java.util.List;

public interface CountryService {
  List<CountryOptionView> getDropdownOptionsSortedAscByName();
  Country findByUuid(String uuid);
}
