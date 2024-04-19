package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.projections.status.GenericStatusView;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus findByName(String statusName);
  ApplicationStatus findByUuid(String uuid);
  List<GenericStatusView> findAll();
}
