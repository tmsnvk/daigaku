package net.tamasnovak.services.university;

import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.university.University;

import java.util.List;
import java.util.UUID;

public interface UniversityService {
  List<UniversityOptionDto> getOptionsByCountryUuid(UUID countryUuid);
  University findByUuid(UUID universityId);
}
