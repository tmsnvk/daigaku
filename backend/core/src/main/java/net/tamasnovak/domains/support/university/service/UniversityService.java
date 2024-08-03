package net.tamasnovak.domains.support.university.service;

import net.tamasnovak.domains.support.university.dto.UniversitySelectOption;
import net.tamasnovak.domains.support.university.entity.University;

import java.util.List;

public interface UniversityService {
  University getByUuid(String uuid);

  List<UniversitySelectOption> getAllSelectOptionsByCountryUuid(String countryUuid);
}
