package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.dtos.applicationStatus.ApplicationStatusFormDto;
import net.tamasnovak.entities.application.ApplicationStatus;

import java.util.List;
import java.util.UUID;

public interface ApplicationStatusService {
  ApplicationStatus findByName(String statusName);
  ApplicationStatus findByUuid(UUID uuid);
  List<ApplicationStatusFormDto> findAll();
}
