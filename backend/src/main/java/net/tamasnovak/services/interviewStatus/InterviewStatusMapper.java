package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.interviewStatus.InterviewStatusFormDto;
import net.tamasnovak.entities.application.InterviewStatus;
import org.springframework.stereotype.Component;

@Component
public final class InterviewStatusMapper {
  public InterviewStatusFormDto toInterviewStatusFromDto(InterviewStatus interviewStatus) {
    return new InterviewStatusFormDto(
      interviewStatus.getUuid(),
      interviewStatus.getName()
    );
  }
}
