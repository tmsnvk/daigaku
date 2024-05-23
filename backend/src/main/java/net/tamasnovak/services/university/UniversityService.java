package net.tamasnovak.services.university;

import net.tamasnovak.dtos.university.UniversitySelectOptionView;
import net.tamasnovak.entities.university.University;

import java.util.List;

public interface UniversityService {
  List<UniversitySelectOptionView> getAllSelectOptionViewsByCountryUuid(String countryUuid);
  University getUniversityByUuid(String uuid);
}
