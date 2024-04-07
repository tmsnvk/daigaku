package net.tamasnovak.services.application.application;

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

  @Autowired
  public ApplicationServiceImpl(ApplicationRepository applicationRepository, ApplicationMapper applicationMapper) {
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto getByUuid(UUID uuid) {
    Application application = applicationRepository.findByUuid(uuid);

    return applicationMapper.toApplicationDto(application);
  }
}
