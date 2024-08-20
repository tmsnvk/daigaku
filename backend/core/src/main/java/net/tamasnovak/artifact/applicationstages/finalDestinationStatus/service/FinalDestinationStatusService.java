package net.tamasnovak.artifact.applicationstages.finalDestinationStatus.service;

import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface FinalDestinationStatusService {
  FinalDestinationStatus findByUuid(UUID uuid);

  FinalDestinationStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
