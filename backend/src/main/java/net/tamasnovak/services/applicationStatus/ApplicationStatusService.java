package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.ApplicationStatus;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus getStatusByName(String statusName);
  ApplicationStatus getStatusByUuid(String uuid);
  ApplicationStatus getStatusByUuidOnApplicationUpdate(ApplicationStatus currentApplicationStatus, String requestBodyStatusUuid);
  List<StatusSelectOptionView> getAllSelectOptionViews();
}
