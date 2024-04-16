package net.tamasnovak.services.institution;

import net.tamasnovak.dtos.institution.response.InstitutionOptionDto;
import net.tamasnovak.entities.institution.Institution;

import java.util.List;
import java.util.UUID;

public interface InstitutionService {
  List<InstitutionOptionDto> getOptionsSortedAscByName();
  Institution findByUuid(UUID uuid);
}
