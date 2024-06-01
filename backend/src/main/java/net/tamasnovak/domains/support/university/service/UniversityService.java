package net.tamasnovak.domains.support.university.service;

import net.tamasnovak.domains.support.university.models.dtoResponses.UniversitySelectOptionDto;
import net.tamasnovak.domains.support.university.models.entity.University;

import java.util.List;

public interface UniversityService {
  University getByUuid(String uuid);

  List<UniversitySelectOptionDto> getAllSelectOptionsByCountryUuid(String countryUuid);
}
