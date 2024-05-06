package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.dtos.status.StatusOptionView;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus findByName(String statusName);
  ApplicationStatus findByUuid(String uuid);
  ApplicationStatus findByUuidOrReturnNull(String uuid);
  List<StatusOptionView> getDropdownOptions();
}
