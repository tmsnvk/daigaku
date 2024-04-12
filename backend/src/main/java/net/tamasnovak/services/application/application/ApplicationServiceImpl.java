package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.application.ApplicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ApplicationServiceImpl implements ApplicationService {
  private final ApplicationRepository applicationRepository;
  private final ApplicationMapper applicationMapper;
  private final ApplicationServiceConstants applicationServiceConstants;

  @Autowired
  public ApplicationServiceImpl(ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ApplicationServiceConstants applicationServiceConstants) {
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.applicationServiceConstants = applicationServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto findByUuid(String uuid) {
    UUID validUuid;

    try {
      validUuid = UUID.fromString(uuid);
    } catch (IllegalArgumentException e) {
      throw new IllegalArgumentException(applicationServiceConstants.NO_APPLICATION_FOUND);
    }

    Application application = applicationRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(applicationServiceConstants.NO_APPLICATION_FOUND));

    return applicationMapper.toApplicationDto(application);
  }
}
