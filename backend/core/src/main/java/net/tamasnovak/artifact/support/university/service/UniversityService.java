package net.tamasnovak.artifact.support.university.service;

import net.tamasnovak.artifact.support.university.dto.UniversitySelectOption;
import net.tamasnovak.artifact.support.university.entity.University;

import java.util.List;
import java.util.UUID;

public interface UniversityService {
  University getByUuid(UUID uuid);

  List<UniversitySelectOption> getAllSelectOptionsByCountryUuid(UUID countryUuid);
}
