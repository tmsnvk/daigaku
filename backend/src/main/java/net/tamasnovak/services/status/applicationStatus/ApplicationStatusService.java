package net.tamasnovak.services.status.applicationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.status.ApplicationStatus;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus getByUuid(String uuid);

  ApplicationStatus getByName(String statusName);

  List<StatusSelectOptionView> getAllSelectOptionViews();
}
