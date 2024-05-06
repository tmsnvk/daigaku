package net.tamasnovak.services.university;

import net.tamasnovak.entities.university.University;
import net.tamasnovak.dtos.university.UniversityOptionView;

import java.util.List;

public interface UniversityService {
  List<UniversityOptionView> getDropdownOptionsByCountryUuidAndSortedAscByName(String countryUuid);
  University findByUuid(String uuid);
}
