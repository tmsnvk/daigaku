package net.tamasnovak.domains.applicationStages.applicationStatus.service;

import net.tamasnovak.domains.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus getByUuid(String uuid);

  ApplicationStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
