package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.dtos.applicationStatus.ApplicationStatusFormDto;
import net.tamasnovak.entities.application.ApplicationStatus;

import java.util.List;

public interface ApplicationStatusService {
  ApplicationStatus findByName(String statusName);
  List<ApplicationStatusFormDto> findAll();
}
