package net.tamasnovak.services.country;

import net.tamasnovak.dtos.country.CountryOptionView;
import net.tamasnovak.entities.country.Country;

import java.util.List;

public interface CountryService {
  List<CountryOptionView> getSelectOptions();
  Country getCountryByUuid(String uuid);
}
