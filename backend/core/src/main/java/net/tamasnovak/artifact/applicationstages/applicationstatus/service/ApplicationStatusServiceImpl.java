package net.tamasnovak.artifact.applicationstages.applicationstatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.applicationstatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "ApplicationStatusService")
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
  @Cacheable(value = "ApplicationStatusByUuid", key = "{ #uuid }")
  public ApplicationStatus getByUuid(final UUID uuid) {
    return applicationStatusRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusByName", key = "{ #statusName }")
  public ApplicationStatus getByName(final String statusName) {
    return applicationStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusSelectOptionViews")
  public List<StatusSelectOption> getAllSelectOptions() {
    return applicationStatusRepository.findAllByOrderByNameAsc();
  }
}
