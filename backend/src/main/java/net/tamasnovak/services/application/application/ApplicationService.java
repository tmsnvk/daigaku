package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.response.ApplicationDto;

public interface ApplicationService {
  ApplicationDto findByUuid(String uuid);
}
