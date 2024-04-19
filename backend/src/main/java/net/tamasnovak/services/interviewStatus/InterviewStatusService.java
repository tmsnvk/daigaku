package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.projections.status.GenericStatusView;

import java.util.List;

public interface InterviewStatusService {
  List<GenericStatusView> findAll();
  InterviewStatus findByUuid(String uuid);
}
