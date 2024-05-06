package net.tamasnovak.services.institution;

import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.dtos.institution.InstitutionOptionView;

import java.util.List;

public interface InstitutionService {
  List<InstitutionOptionView> getDropdownOptionsSortedAscByName();
  Institution findByUuid(String uuid);
}
