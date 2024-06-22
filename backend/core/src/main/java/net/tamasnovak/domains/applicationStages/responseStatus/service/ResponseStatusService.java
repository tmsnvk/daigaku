package net.tamasnovak.domains.applicationStages.responseStatus.service;

import net.tamasnovak.domains.applicationStages.responseStatus.models.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;

import java.util.List;

public interface ResponseStatusService {
  ResponseStatus getByUuid(String uuid);

  ResponseStatus getByName(String statusName);

  List<StageSelectOptionDto> getAllSelectOptions();
}
