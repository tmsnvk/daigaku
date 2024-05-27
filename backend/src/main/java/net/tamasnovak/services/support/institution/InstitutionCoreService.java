package net.tamasnovak.services.support.institution;

import net.tamasnovak.dtos.institution.InstitutionOptionView;

import java.util.List;

public interface InstitutionCoreService {
  List<InstitutionOptionView> getAllSelectOptionViews();
}
