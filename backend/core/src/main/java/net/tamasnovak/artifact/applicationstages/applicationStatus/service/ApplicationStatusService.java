package net.tamasnovak.artifact.applicationstages.applicationStatus.service;

import net.tamasnovak.artifact.applicationstages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface ApplicationStatusService {
  ApplicationStatus findByUuid(UUID uuid);

  ApplicationStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
