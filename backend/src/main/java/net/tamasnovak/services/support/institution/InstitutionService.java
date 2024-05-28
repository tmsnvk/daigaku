package net.tamasnovak.services.support.institution;

import net.tamasnovak.dtos.institution.InstitutionOptionView;
import net.tamasnovak.entities.support.institution.Institution;

import java.util.List;

public interface InstitutionService {
  List<InstitutionOptionView> getAllSelectOptionViews();

  Institution getByUuid(String uuid);
}
