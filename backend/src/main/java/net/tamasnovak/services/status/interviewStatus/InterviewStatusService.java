package net.tamasnovak.services.status.interviewStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.status.InterviewStatus;

import java.util.List;

public interface InterviewStatusService {
  InterviewStatus getByUuid(String uuid);

  InterviewStatus getByName(String statusName);

  List<StatusSelectOptionView> getAllSelectOptionViews();
}
