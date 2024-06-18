package net.tamasnovak.domains.applicationStages.applicationStatus.service;

import net.tamasnovak.domains.applicationStages.applicationStatus.models.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus getByUuid(String uuid);

  ApplicationStatus getByName(String statusName);

  List<StageSelectOptionDto> getAllSelectOptions();
}
