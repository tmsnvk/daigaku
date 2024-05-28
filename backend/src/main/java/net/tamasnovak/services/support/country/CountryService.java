package net.tamasnovak.services.support.country;

import net.tamasnovak.dtos.country.CountrySelectOptionDto;
import net.tamasnovak.entities.support.country.Country;

import java.util.List;

public interface CountryService {
  List<CountrySelectOptionDto> getAllSelectOptionViews();

  Country getByUuid(String uuid);
}
