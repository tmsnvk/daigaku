package net.tamasnovak.artifact.applicationStages.responseStatus.service;

import net.tamasnovak.artifact.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationStages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface ResponseStatusService {
  ResponseStatus findByUuid(UUID uuid);

  ResponseStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
