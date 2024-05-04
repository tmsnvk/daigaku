package net.tamasnovak.services.application;

import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.entities.application.Application;
import org.springframework.stereotype.Component;

@Component
public final class ApplicationMapper {
  public ApplicationDto toApplicationDto(Application application, String createdBy, String lastModifiedBy) {
    return new ApplicationDto(
      application.getUuid(),
      application.getStudent().getAccount().getUuid(),
      application.getCountry().getName(),
      application.getUniversity().getName(),
      application.getCourseName(),
      application.getMinorSubject(),
      application.getProgrammeLength(),
      application.getApplicationStatus() != null ? application.getApplicationStatus().getName() : null,
      application.getInterviewStatus() != null ? application.getInterviewStatus().getName() : null,
      application.getOfferStatus() != null ? application.getOfferStatus().getName() : null,
      application.getResponseStatus() != null ? application.getResponseStatus().getName() : null,
      application.getFinalDestinationStatus() != null ? application.getFinalDestinationStatus().getName() : null,
      application.getCreatedAt(),
      application.getLastUpdatedAt(),
      createdBy,
      lastModifiedBy,
      application.isMarkedForDeletion()
    );
  }
}
