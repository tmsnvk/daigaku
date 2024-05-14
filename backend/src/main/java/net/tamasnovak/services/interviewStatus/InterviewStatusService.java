package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.InterviewStatus;

import java.util.List;

public interface InterviewStatusService {
  List<StatusSelectOptionView> getSelectOptions();
  InterviewStatus getStatusByUuid(String uuid);
  InterviewStatus getStatusByUuidOnApplicationUpdate(InterviewStatus currentStatus, String requestBodyStatusUuid);
}
