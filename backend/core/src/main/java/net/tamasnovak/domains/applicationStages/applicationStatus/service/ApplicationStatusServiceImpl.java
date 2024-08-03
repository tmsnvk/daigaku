package net.tamasnovak.domains.applicationStages.applicationStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.applicationStatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
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
  public ApplicationStatus getByUuid(final String uuid) {
    return applicationStatusRepository.findByUuid(UUID.fromString(uuid))
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
