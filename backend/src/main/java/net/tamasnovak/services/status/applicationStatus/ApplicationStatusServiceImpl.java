package net.tamasnovak.services.status.applicationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.repositories.applicationStatus.ApplicationStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ApplicationStatusServiceImpl implements ApplicationStatusService {
  private final ApplicationStatusRepository applicationStatusRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public ApplicationStatusServiceImpl(ApplicationStatusRepository applicationStatusRepository, GlobalServiceConstants globalServiceConstants) {
    this.applicationStatusRepository = applicationStatusRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatus", key = "#statusName")
  public ApplicationStatus getStatusByName(String statusName) {
    return applicationStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatus", key = "#uuid")
  public ApplicationStatus getStatusByUuid(String uuid) {
    return applicationStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusSelectOptionView")
  public List<StatusSelectOptionView> getAllSelectOptionViews() {
    return applicationStatusRepository.findAllByOrderByNameAsc();
  }
}
