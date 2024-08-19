package net.tamasnovak.domain.applicationStages.responseStatus.service;

import net.tamasnovak.domain.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface ResponseStatusService {
  ResponseStatus getByUuid(UUID uuid);

  ResponseStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
