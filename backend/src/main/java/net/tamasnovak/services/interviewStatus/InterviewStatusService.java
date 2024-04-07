package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.interviewStatus.InterviewStatusFormDto;
import net.tamasnovak.entities.application.InterviewStatus;

import java.util.List;
import java.util.UUID;

public interface InterviewStatusService {
  List<InterviewStatusFormDto> findAll();
  InterviewStatus findByUuid(UUID uuid);
}
