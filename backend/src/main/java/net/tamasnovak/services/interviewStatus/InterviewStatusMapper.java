package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.interviewStatus.response.InterviewStatusOptionDto;
import net.tamasnovak.entities.application.InterviewStatus;
import org.springframework.stereotype.Component;

@Component
public final class InterviewStatusMapper {
  public InterviewStatusOptionDto toInterviewStatusFromDto(InterviewStatus interviewStatus) {
    return new InterviewStatusOptionDto(
      interviewStatus.getUuid(),
      interviewStatus.getName()
    );
  }
}
