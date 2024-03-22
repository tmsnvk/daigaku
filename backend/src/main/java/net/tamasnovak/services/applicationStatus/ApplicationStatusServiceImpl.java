package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.repositories.ApplicationStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ApplicationStatusServiceImpl implements ApplicationStatusService {
  private final ApplicationStatusRepository applicationStatusRepository;

  @Autowired
  public ApplicationStatusServiceImpl(ApplicationStatusRepository applicationStatusRepository) {
    this.applicationStatusRepository = applicationStatusRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationStatus findByName(String statusName) {
    return applicationStatusRepository.findByName(statusName);
  }
}
