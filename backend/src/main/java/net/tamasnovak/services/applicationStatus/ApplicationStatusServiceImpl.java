package net.tamasnovak.services.applicationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.annotations.uuidValidation.UuidConstraint;
import net.tamasnovak.dtos.status.StatusOptionView;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.repositories.applicationStatus.ApplicationStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
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
  public ApplicationStatus findByName(String statusName) {
    return applicationStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationStatus findByUuid(@UuidConstraint String uuid) {
    return applicationStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationStatus findByUuidOrReturnNull(String uuid) {
    if (Objects.equals(uuid, "")) {
      return null;
    }

    return findByUuid(uuid);
  }

  @Override
  @Transactional(readOnly = true)
  public List<StatusOptionView> getDropdownOptions() {
    return applicationStatusRepository.findAllByOrderByNameAsc();
  }
}
