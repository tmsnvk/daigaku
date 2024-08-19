package net.tamasnovak.artifact.support.country.service;

import net.tamasnovak.artifact.support.country.dto.CountryDropdownOption;
import net.tamasnovak.artifact.support.country.entity.Country;

import java.util.List;
import java.util.UUID;

public interface CountryService {
  Country findByUuid(UUID uuid);

  List<CountryDropdownOption> findAllSortedByName();
}
