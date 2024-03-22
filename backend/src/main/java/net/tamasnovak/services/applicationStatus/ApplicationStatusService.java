package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.entities.application.ApplicationStatus;

public interface ApplicationStatusService {
  ApplicationStatus findByName(String statusName);
}
