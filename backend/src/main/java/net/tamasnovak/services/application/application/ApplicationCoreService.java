package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.application.Application;

public interface ApplicationCoreService {
  Application getApplicationByUuid(String uuid);
  MappedApplicationView getMappedApplicationViewByUuid(String uuid);
}
