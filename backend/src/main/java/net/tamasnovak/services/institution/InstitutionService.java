package net.tamasnovak.services.institution;

import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.projections.institution.InstitutionOptionView;

import java.util.List;
import java.util.UUID;

public interface InstitutionService {
  List<InstitutionOptionView> getOptionsSortedAscByName();
  Institution findByUuid(UUID uuid);
}
