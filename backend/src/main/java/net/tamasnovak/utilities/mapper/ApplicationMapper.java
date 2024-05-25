package net.tamasnovak.utilities.mapper;

import net.tamasnovak.dtos.application.response.applicationView.ApplicationView;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {
  public MappedApplicationView toMappedApplicationView(ApplicationView applicationView) {
    return new MappedApplicationView(
      applicationView.getUuid(),
      applicationView.getAccountUuid(),
      applicationView.getCountry(),
      applicationView.getUniversity(),
      applicationView.getCourseName(),
      applicationView.getMinorSubject(),
      applicationView.getProgrammeLength(),
      applicationView.getApplicationStatus(),
      applicationView.getInterviewStatus(),
      applicationView.getOfferStatus(),
      applicationView.getResponseStatus(),
      applicationView.getFinalDestinationStatus(),
      applicationView.getCreatedAt(),
      applicationView.getLastUpdatedAt(),
      applicationView.getCreatedBy(),
      applicationView.getLastModifiedBy(),
      applicationView.getIsRemovable()
    );
  }
}
