package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.interviewStatus.InterviewStatusFormDto;

import java.util.List;

public interface InterviewStatusService {
  List<InterviewStatusFormDto> findAll();
}
