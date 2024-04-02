package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.ApplicationDto;

import java.util.UUID;

public interface ApplicationService {
  ApplicationDto getByUuid(UUID id);
}
