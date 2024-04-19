package net.tamasnovak.services.university;

import net.tamasnovak.entities.university.University;
import net.tamasnovak.projections.university.UniversityOptionView;

import java.util.List;
import java.util.UUID;

public interface UniversityService {
  List<UniversityOptionView> getOptionsByCountryUuidAndSortedAscByName(UUID countryUuid);
  University findByUuid(UUID universityUuid);
}
