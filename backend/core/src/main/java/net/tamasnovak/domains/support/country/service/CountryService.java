package net.tamasnovak.domains.support.country.service;

import net.tamasnovak.domains.support.country.dto.CountrySelectOption;
import net.tamasnovak.domains.support.country.entity.Country;

import java.util.List;

public interface CountryService {
  Country getByUuid(String uuid);

  List<CountrySelectOption> getAllSelectOptions();
}
