package net.tamasnovak.services.support.institution;

import net.tamasnovak.dtos.institution.InstitutionOptionDto;
import net.tamasnovak.entities.support.institution.Institution;

import java.util.List;

public interface InstitutionService {
  List<InstitutionOptionDto> getAllSelectOptionViews();

  Institution getByUuid(String uuid);
}
