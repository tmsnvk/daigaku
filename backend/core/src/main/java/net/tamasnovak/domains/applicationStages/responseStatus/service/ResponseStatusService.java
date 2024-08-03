package net.tamasnovak.domains.applicationStages.responseStatus.service;

import net.tamasnovak.domains.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;

public interface ResponseStatusService {
  ResponseStatus getByUuid(String uuid);

  ResponseStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
