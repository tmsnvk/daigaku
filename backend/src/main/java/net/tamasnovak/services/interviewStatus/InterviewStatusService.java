package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.dtos.status.StatusOptionView;

import java.util.List;

public interface InterviewStatusService {
  List<StatusOptionView> getDropdownOptions();
  InterviewStatus findByUuid(String uuid);
  InterviewStatus findByUuidOrReturnNull(String uuid);
}
