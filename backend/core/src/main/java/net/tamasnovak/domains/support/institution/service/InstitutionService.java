package net.tamasnovak.domains.support.institution.service;

import net.tamasnovak.domains.support.institution.dto.InstitutionOption;
import net.tamasnovak.domains.support.institution.entity.Institution;

import java.util.List;

public interface InstitutionService {
  Institution getByUuid(String uuid);

  Institution getById(long id);

  List<InstitutionOption> getAllSelectOptions();
}
