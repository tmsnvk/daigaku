package net.tamasnovak.services.support.country;

import net.tamasnovak.dtos.country.CountrySelectOptionView;
import net.tamasnovak.entities.support.country.Country;

import java.util.List;

public interface CountryService {
  List<CountrySelectOptionView> getAllSelectOptionViews();

  Country getByUuid(String uuid);
}
