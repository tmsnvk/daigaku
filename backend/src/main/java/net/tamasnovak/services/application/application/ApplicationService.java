package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.entities.application.Application;

public interface ApplicationService {
  ApplicationDto getApplicationDtoByUuid(String uuid);
  Application getApplicationByUuid(String uuid);
}
