package net.tamasnovak.domains.application.application.service;

import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.application.shared.models.entity.Application;

public interface ApplicationService {
  Application getByUuid(String uuid);

  ApplicationDto getApplicationDtoByUuid(String uuid);
}
