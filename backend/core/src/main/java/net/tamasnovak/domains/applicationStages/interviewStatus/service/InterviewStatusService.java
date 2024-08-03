package net.tamasnovak.domains.applicationStages.interviewStatus.service;

import net.tamasnovak.domains.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;

public interface InterviewStatusService {
  InterviewStatus getByUuid(String uuid);

  InterviewStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
