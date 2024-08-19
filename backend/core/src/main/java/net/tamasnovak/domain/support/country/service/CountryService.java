package net.tamasnovak.domain.support.country.service;

import net.tamasnovak.domain.support.country.dto.CountrySelectOption;
import net.tamasnovak.domain.support.country.entity.Country;

import java.util.List;
import java.util.UUID;

public interface CountryService {
  Country getByUuid(UUID uuid);

  List<CountrySelectOption> getAllSelectOptions();
}
