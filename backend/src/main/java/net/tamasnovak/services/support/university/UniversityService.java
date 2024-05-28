package net.tamasnovak.services.support.university;

import net.tamasnovak.dtos.university.UniversitySelectOptionDto;
import net.tamasnovak.entities.support.university.University;

import java.util.List;

public interface UniversityService {
  List<UniversitySelectOptionDto> getAllSelectOptionViewsByCountryUuid(String countryUuid);

  University getByUuid(String uuid);
}
