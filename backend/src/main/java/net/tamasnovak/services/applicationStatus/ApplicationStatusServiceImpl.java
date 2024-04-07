package net.tamasnovak.services.applicationStatus;

import net.tamasnovak.dtos.applicationStatus.ApplicationStatusFormDto;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.repositories.applicationStatus.ApplicationStatusRepository;
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

  @Autowired
  public ApplicationStatusServiceImpl(ApplicationStatusRepository applicationStatusRepository, ApplicationStatusMapper applicationStatusMapper) {
    this.applicationStatusRepository = applicationStatusRepository;
    this.applicationStatusMapper = applicationStatusMapper;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationStatus findByName(String statusName) {
    return applicationStatusRepository.findByName(statusName);
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationStatus findByUuid(UUID uuid) {
    return applicationStatusRepository.findByUuid(uuid);
  }

  @Override
  @Transactional(readOnly = true)
  public List<ApplicationStatusFormDto> findAll() {
    List<ApplicationStatus> applicationStatuses = applicationStatusRepository.findAll();

    return applicationStatuses.stream()
      .map(applicationStatusMapper::toApplicationStatusFormDto)
      .collect(Collectors.toList());
  }
}
