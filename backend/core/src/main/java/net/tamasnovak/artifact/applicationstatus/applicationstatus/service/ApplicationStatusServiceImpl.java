package net.tamasnovak.artifact.applicationstatus.applicationstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "ApplicationStatusService")
public class ApplicationStatusServiceImpl implements ApplicationStatusService {
  private final ApplicationStatusRepository applicationStatusRepository;
  private final GlobalServiceMessages globalServiceMessages;

  @Autowired
  public ApplicationStatusServiceImpl(
    ApplicationStatusRepository applicationStatusRepository,
    GlobalServiceMessages globalServiceMessages) {
    this.applicationStatusRepository = applicationStatusRepository;
    this.globalServiceMessages = globalServiceMessages;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusByUuid", key = "{ #applicationStatusUuid }")
  public ApplicationStatus findApplicationStatusByUuid(final UUID applicationStatusUuid) {
    return applicationStatusRepository.findApplicationStatusByUuid(applicationStatusUuid)
                                      .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusByName", key = "{ #applicationStatusName }")
  public ApplicationStatus findApplicationStatusByName(final String applicationStatusName) {
    return applicationStatusRepository.findApplicationStatusByName(applicationStatusName)
                                      .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationStatusDropdownOption")
  public List<StatusDropdownOption> findSelectOptionsSortedByName() {
    return applicationStatusRepository.findSelectOptionsByOrderByNameAsc();
  }
}
