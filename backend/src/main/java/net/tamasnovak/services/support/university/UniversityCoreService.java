package net.tamasnovak.services.support.university;

import net.tamasnovak.dtos.university.UniversitySelectOptionView;

import java.util.List;

public interface UniversityCoreService {
  List<UniversitySelectOptionView> getAllSelectOptionViewsByCountryUuid(String countryUuid);
}
