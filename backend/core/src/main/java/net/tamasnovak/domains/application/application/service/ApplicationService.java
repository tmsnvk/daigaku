package net.tamasnovak.domains.application.application.service;

import net.tamasnovak.domains.application.shared.dto.ApplicationData;

public interface ApplicationService {
  net.tamasnovak.domains.application.shared.entity.Application getByUuid(String uuid);

  ApplicationData getApplicationDtoByUuid(String uuid);
}
