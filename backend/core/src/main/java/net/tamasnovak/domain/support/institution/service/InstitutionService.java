package net.tamasnovak.domain.support.institution.service;

import net.tamasnovak.domain.support.institution.dto.InstitutionOption;
import net.tamasnovak.domain.support.institution.entity.Institution;

import java.util.List;
import java.util.UUID;

public interface InstitutionService {
  Institution getByUuid(UUID uuid);

  Institution getById(long id);

  List<InstitutionOption> getAllSelectOptions();
}
