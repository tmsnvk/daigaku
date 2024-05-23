package net.tamasnovak.services.institution;

import net.tamasnovak.dtos.institution.InstitutionOptionView;
import net.tamasnovak.entities.institution.Institution;

import java.util.List;

public interface InstitutionService {
  List<InstitutionOptionView> getAllSelectOptionViews();
  Institution getInstitutionByUuid(String uuid);
}
