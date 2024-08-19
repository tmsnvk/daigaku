package net.tamasnovak.domain.applicationStages.interviewStatus.service;

import net.tamasnovak.domain.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface InterviewStatusService {
  InterviewStatus getByUuid(UUID uuid);

  InterviewStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
