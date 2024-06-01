package net.tamasnovak.domains.support.country.service;

import net.tamasnovak.domains.support.country.models.dtoResponses.CountrySelectOptionDto;
import net.tamasnovak.domains.support.country.models.entity.Country;

import java.util.List;

public interface CountryService {
  Country getByUuid(String uuid);

  List<CountrySelectOptionDto> getAllSelectOptions();
}
