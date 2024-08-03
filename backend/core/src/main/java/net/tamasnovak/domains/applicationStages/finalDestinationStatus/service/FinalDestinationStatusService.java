package net.tamasnovak.domains.applicationStages.finalDestinationStatus.service;

import net.tamasnovak.domains.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;

public interface FinalDestinationStatusService {
  FinalDestinationStatus getByUuid(String uuid);

  FinalDestinationStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
