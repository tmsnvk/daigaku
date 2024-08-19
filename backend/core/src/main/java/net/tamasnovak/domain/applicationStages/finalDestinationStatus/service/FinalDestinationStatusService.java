package net.tamasnovak.domain.applicationStages.finalDestinationStatus.service;

import net.tamasnovak.domain.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface FinalDestinationStatusService {
  FinalDestinationStatus getByUuid(UUID uuid);

  FinalDestinationStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
