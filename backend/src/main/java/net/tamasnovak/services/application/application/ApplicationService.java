package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.entities.application.Application;

public interface ApplicationService {
  Application getByUuid(String uuid);

  MappedApplicationView getMappedApplicationViewByUuid(String uuid);
}
