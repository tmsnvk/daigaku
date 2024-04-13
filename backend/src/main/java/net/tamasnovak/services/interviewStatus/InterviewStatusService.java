package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.interviewStatus.response.InterviewStatusOptionDto;
import net.tamasnovak.entities.application.InterviewStatus;

import java.util.List;
import java.util.UUID;

public interface InterviewStatusService {
  List<InterviewStatusOptionDto> findAll();
  InterviewStatus findByUuid(UUID uuid);
}
