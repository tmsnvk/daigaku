package net.tamasnovak.artifact.applicationstages.applicationStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.applicationStatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
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
  public ApplicationStatus findByUuid(final UUID uuid) {
    return applicationStatusRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusByName", key = "{ #statusName }")
  public ApplicationStatus findByName(final String statusName) {
    return applicationStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusDropdownOption")
  public List<StatusDropdownOption> findAllSortedByName() {
    return applicationStatusRepository.findAllByOrderByNameAsc();
  }
}
