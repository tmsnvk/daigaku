package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.ApplicationDto;

public interface ApplicationService {
  ApplicationDto findByUuid(String uuid);
}
