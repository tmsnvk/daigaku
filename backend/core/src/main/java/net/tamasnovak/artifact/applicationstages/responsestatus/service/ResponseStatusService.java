package net.tamasnovak.artifact.applicationstages.responsestatus.service;

import net.tamasnovak.artifact.applicationstages.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface ResponseStatusService {
  ResponseStatus getByUuid(UUID uuid);

  ResponseStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
