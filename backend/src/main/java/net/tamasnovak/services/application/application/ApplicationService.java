package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.application.Application;

public interface ApplicationService {
  MappedApplicationView getMappedApplicationViewByUuid(String uuid);
  Application getApplicationByUuid(String uuid);
}
