package net.tamasnovak.services.support.university;

import net.tamasnovak.dtos.university.UniversitySelectOptionView;
import net.tamasnovak.entities.support.university.University;

import java.util.List;

public interface UniversityService {
  List<UniversitySelectOptionView> getAllSelectOptionViewsByCountryUuid(String countryUuid);

  University getByUuid(String uuid);
}
