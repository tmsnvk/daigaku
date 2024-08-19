package net.tamasnovak.artifact.application.application.service;

import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.entity.Application;

import java.util.UUID;

public interface ApplicationService {
  Application findByUuid(UUID uuid);

  ApplicationData fetchApplicationDataByUuid(UUID uuid);
}
