package net.tamasnovak.domains.applicationStages.finalDestinationStatus.service;

import net.tamasnovak.domains.applicationStages.finalDestinationStatus.models.entity.FinalDestinationStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;

import java.util.List;

public interface FinalDestinationStatusService {
  FinalDestinationStatus getByUuid(String uuid);

  FinalDestinationStatus getByName(String statusName);

  List<StageSelectOptionDto> getAllSelectOptions();
}
