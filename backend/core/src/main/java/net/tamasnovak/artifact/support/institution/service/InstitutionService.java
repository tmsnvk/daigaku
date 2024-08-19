package net.tamasnovak.artifact.support.institution.service;

import net.tamasnovak.artifact.support.institution.dto.InstitutionDropdownOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;

import java.util.List;
import java.util.UUID;

public interface InstitutionService {
  Institution findByUuid(UUID uuid);

  Institution findById(long id);

  List<InstitutionDropdownOption> findAllSortedByName();
}
