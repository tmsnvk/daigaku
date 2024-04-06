package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.dtos.applicationStatus.ApplicationStatusFormDto;
import net.tamasnovak.entities.application.ApplicationStatus;
import org.springframework.stereotype.Component;

@Component
public final class ApplicationStatusMapper {
  public ApplicationStatusFormDto toApplicationStatusFormDto(ApplicationStatus applicationStatus) {
    return new ApplicationStatusFormDto(
      applicationStatus.getUuid(),
      applicationStatus.getName()
    );
  }
}
