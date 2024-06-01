package net.tamasnovak.domains.support.institution.service;

import net.tamasnovak.domains.support.institution.models.dtoResponses.InstitutionOptionDto;
import net.tamasnovak.domains.support.institution.models.entity.Institution;

import java.util.List;

public interface InstitutionService {
  Institution getByUuid(String uuid);

  List<InstitutionOptionDto> getAllSelectOptions();
}
