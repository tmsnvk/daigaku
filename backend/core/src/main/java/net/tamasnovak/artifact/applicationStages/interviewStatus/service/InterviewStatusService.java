package net.tamasnovak.artifact.applicationStages.interviewStatus.service;

import net.tamasnovak.artifact.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationStages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface InterviewStatusService {
  InterviewStatus findByUuid(UUID uuid);

  InterviewStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
