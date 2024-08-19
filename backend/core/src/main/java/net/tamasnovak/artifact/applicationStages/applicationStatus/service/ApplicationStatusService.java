package net.tamasnovak.artifact.applicationStages.applicationStatus.service;

import net.tamasnovak.artifact.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationStages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface ApplicationStatusService {
  ApplicationStatus findByUuid(UUID uuid);

  ApplicationStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
