package net.tamasnovak.services.country;

import net.tamasnovak.dtos.country.CountrySelectOptionView;
import net.tamasnovak.entities.country.Country;

import java.util.List;

public interface CountryService {
  List<CountrySelectOptionView> getAllSelectOptionViews();
  Country getCountryByUuid(String uuid);
}
