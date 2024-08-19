package net.tamasnovak.artifact.applicationstages.applicationstatus.service;

import net.tamasnovak.artifact.applicationstages.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface ApplicationStatusService {
  ApplicationStatus getByUuid(UUID uuid);

  ApplicationStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
