package net.tamasnovak.artifact.applicationStages.finalDestinationStatus.service;

import net.tamasnovak.artifact.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationStages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface FinalDestinationStatusService {
  FinalDestinationStatus findByUuid(UUID uuid);

  FinalDestinationStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
