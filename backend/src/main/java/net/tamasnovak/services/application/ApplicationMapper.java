package net.tamasnovak.services.application;

import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.entities.application.Application;
import org.springframework.stereotype.Component;

@Component
final class ApplicationMapper {
  public ApplicationDto toApplicationDto(Application application) {
    return new ApplicationDto(
      application.getUuid(),
      application.getAccountId().getUuid(),
      application.getCountryId().getName(),
      application.getUniversityId().getName(),
      application.getCourseName(),
      application.getMinorSubject(),
      application.getProgrammeLength(),
      application.getApplicationStatusId() != null ? application.getApplicationStatusId().getName() : null,
      application.getInterviewStatusId() != null ? application.getInterviewStatusId().getName() : null,
      application.getOfferStatusId() != null ? application.getOfferStatusId().getName() : null,
      application.getResponseStatusId() != null ? application.getResponseStatusId().getName() : null,
      application.getFinalDestinationStatusId() != null ? application.getFinalDestinationStatusId().getName() : null,
      application.getNotes(),
      application.getCreatedAt(),
      application.getLastUpdatedAt()
    );
  }
}
