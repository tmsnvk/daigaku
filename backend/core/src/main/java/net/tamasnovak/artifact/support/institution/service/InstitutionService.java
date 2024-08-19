package net.tamasnovak.artifact.support.institution.service;

import net.tamasnovak.artifact.support.institution.dto.InstitutionOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;

import java.util.List;
import java.util.UUID;

public interface InstitutionService {
  Institution getByUuid(UUID uuid);

  Institution getById(long id);

  List<InstitutionOption> getAllSelectOptions();
}
