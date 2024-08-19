package net.tamasnovak.artifact.applicationstages.interviewstatus.service;

import net.tamasnovak.artifact.applicationstages.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface InterviewStatusService {
  InterviewStatus getByUuid(UUID uuid);

  InterviewStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
