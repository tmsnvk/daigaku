package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.InterviewStatus;

import java.util.List;

public interface InterviewStatusService {
  List<StatusSelectOptionView> getSelectOptions();
  InterviewStatus findByUuid(String uuid);
  InterviewStatus findByUuidOrReturnNull(String uuid);
}
