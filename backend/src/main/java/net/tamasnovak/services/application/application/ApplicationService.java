package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.response.ApplicationView;
import net.tamasnovak.entities.application.Application;

public interface ApplicationService {
  ApplicationView getApplicationViewByUuid(String uuid);
  Application getApplicationByUuid(String uuid);
}
