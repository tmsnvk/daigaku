package net.tamasnovak.services.support.country;

import net.tamasnovak.dtos.country.CountrySelectOptionView;

import java.util.List;

public interface CountryCoreService {
  List<CountrySelectOptionView> getAllSelectOptionViews();
}
