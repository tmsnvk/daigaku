package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.entities.application.Application;

public interface ApplicationService {
  ApplicationDto findByUuidAndReturnApplicationDto(String uuid);
  Application findByUuid(String uuid);
}
