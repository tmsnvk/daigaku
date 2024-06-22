package net.tamasnovak.domains.applicationStages.interviewStatus.service;

import net.tamasnovak.domains.applicationStages.interviewStatus.models.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;

import java.util.List;

public interface InterviewStatusService {
  InterviewStatus getByUuid(String uuid);

  InterviewStatus getByName(String statusName);

  List<StageSelectOptionDto> getAllSelectOptions();
}
