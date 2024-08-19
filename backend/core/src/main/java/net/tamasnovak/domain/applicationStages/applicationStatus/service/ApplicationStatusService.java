package net.tamasnovak.domain.applicationStages.applicationStatus.service;

import net.tamasnovak.domain.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface ApplicationStatusService {
  ApplicationStatus getByUuid(UUID uuid);

  ApplicationStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
