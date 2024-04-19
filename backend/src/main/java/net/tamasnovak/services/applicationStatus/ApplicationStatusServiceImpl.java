package net.tamasnovak.services.applicationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.applicationStatus.response.ApplicationStatusOptionDto;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.repositories.applicationStatus.ApplicationStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ApplicationStatusServiceImpl implements ApplicationStatusService {
  private final ApplicationStatusRepository applicationStatusRepository;
  private final ApplicationStatusMapper applicationStatusMapper;
  private final ValidatorUtilities validatorUtilities;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public ApplicationStatusServiceImpl(ApplicationStatusRepository applicationStatusRepository, ApplicationStatusMapper applicationStatusMapper, ValidatorUtilities validatorUtilities, GlobalServiceConstants globalServiceConstants) {
    this.applicationStatusRepository = applicationStatusRepository;
    this.applicationStatusMapper = applicationStatusMapper;
    this.validatorUtilities = validatorUtilities;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationStatus findByName(String statusName) {
    return applicationStatusRepository.findByName(statusName);
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid, globalServiceConstants.NO_RECORD_FOUND);

    return applicationStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public List<ApplicationStatusOptionDto> findAll() {
    List<ApplicationStatus> applicationStatuses = applicationStatusRepository.findAll();

    return applicationStatuses.stream()
      .map(applicationStatusMapper::toApplicationStatusFormDto)
      .collect(Collectors.toList());
  }
}
