package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.dtos.applicationStatus.response.ApplicationStatusOptionDto;
import net.tamasnovak.entities.application.ApplicationStatus;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus findByName(String statusName);
  ApplicationStatus findByUuid(String uuid);
  List<ApplicationStatusOptionDto> findAll();
}
