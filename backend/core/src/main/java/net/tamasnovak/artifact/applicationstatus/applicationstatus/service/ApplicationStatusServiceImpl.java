/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.applicationstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link ApplicationStatus} entity-related operations, implementing {@link ApplicationStatusService}.
 */
@Service
@Qualifier(value = "ApplicationStatusService")
public class ApplicationStatusServiceImpl implements ApplicationStatusService {
  private final ApplicationStatusRepository applicationStatusRepository;

  @Autowired
  public ApplicationStatusServiceImpl(ApplicationStatusRepository applicationStatusRepository) {
    this.applicationStatusRepository = applicationStatusRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusByUuid", key = "{ #statusUuid }")
  public ApplicationStatus findStatusByUuid(final UUID statusUuid) {
    return applicationStatusRepository.findApplicationStatusByUuid(statusUuid)
                                      .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusByName", key = "{ #statusName }")
  public ApplicationStatus findStatusByName(final String statusName) {
    return applicationStatusRepository.findApplicationStatusByName(statusName)
                                      .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusDropdownOption")
  public List<StatusSelectOption> findSelectOptionsSortedByName() {
    return applicationStatusRepository.findSelectOptionsByOrderByNameAsc();
  }
}
