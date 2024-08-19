package net.tamasnovak.artifact.support.country.service;

import net.tamasnovak.artifact.support.country.dto.CountrySelectOption;
import net.tamasnovak.artifact.support.country.entity.Country;

import java.util.List;
import java.util.UUID;

public interface CountryService {
  Country getByUuid(UUID uuid);

  List<CountrySelectOption> getAllSelectOptions();
}
