package net.tamasnovak.domain.application.application.service;

import net.tamasnovak.domain.application.shared.dto.ApplicationData;
import net.tamasnovak.domain.application.shared.entity.Application;

import java.util.UUID;

public interface ApplicationService {
  Application getByUuid(UUID uuid);

  ApplicationData getApplicationDtoByUuid(UUID uuid);
}
