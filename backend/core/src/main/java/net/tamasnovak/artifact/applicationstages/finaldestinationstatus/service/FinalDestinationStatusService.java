package net.tamasnovak.artifact.applicationstages.finaldestinationstatus.service;

import net.tamasnovak.artifact.applicationstages.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface FinalDestinationStatusService {
  FinalDestinationStatus getByUuid(UUID uuid);

  FinalDestinationStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
