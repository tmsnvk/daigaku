package net.tamasnovak.artifact.applicationstages.responseStatus.service;

import net.tamasnovak.artifact.applicationstages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface ResponseStatusService {
  ResponseStatus findByUuid(UUID uuid);

  ResponseStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
