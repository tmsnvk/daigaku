package net.tamasnovak.artifact.support.university.service;

import net.tamasnovak.artifact.support.university.dto.UniversityDropdownOption;
import net.tamasnovak.artifact.support.university.entity.University;

import java.util.List;
import java.util.UUID;

public interface UniversityService {
  University findByUuid(UUID uuid);

  List<UniversityDropdownOption> findAllByCountryUuidAndSortedByName(UUID countryUuid);
}
