package net.tamasnovak.artifact.applicationstages.interviewStatus.service;

import net.tamasnovak.artifact.applicationstages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface InterviewStatusService {
  InterviewStatus findByUuid(UUID uuid);

  InterviewStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
