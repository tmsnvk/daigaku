package net.tamasnovak.services.university;

import net.tamasnovak.dtos.university.UniversityOptionView;
import net.tamasnovak.entities.university.University;

import java.util.List;

public interface UniversityService {
  List<UniversityOptionView> getSelectOptionsByCountryUuid(String countryUuid);
  University getUniversityByUuid(String uuid);
}
