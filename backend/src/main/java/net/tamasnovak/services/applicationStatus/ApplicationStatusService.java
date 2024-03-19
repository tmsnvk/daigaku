package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.exceptions.dbReourseNotFound.DbResourceNotFoundException;
import net.tamasnovak.repositories.ApplicationStatusRepository;
import org.springframework.stereotype.Service;

@Service
public class ApplicationStatusService {
  private final ApplicationStatusRepository applicationStatusRepository;

  public ApplicationStatusService(ApplicationStatusRepository applicationStatusRepository) {
    this.applicationStatusRepository = applicationStatusRepository;
  }

  public ApplicationStatus findByName(String statusName) {
    return applicationStatusRepository.findByName(statusName).orElseThrow(() -> new DbResourceNotFoundException(""));
  }
}
