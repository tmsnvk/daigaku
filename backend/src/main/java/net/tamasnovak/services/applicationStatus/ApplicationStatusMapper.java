package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.dtos.applicationStatus.response.ApplicationStatusOptionDto;
import net.tamasnovak.entities.application.ApplicationStatus;
import org.springframework.stereotype.Component;

@Component
public final class ApplicationStatusMapper {
  public ApplicationStatusOptionDto toApplicationStatusFormDto(ApplicationStatus applicationStatus) {
    return new ApplicationStatusOptionDto(
      applicationStatus.getUuid(),
      applicationStatus.getName()
    );
  }
}
