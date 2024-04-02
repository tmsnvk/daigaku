package net.tamasnovak.services.application.application;

import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.application.ApplicationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
  public ApplicationDto getByUuid(UUID id) {
    Application application = applicationRepository.findByUuid(id);

    return applicationMapper.toApplicationDto(application);
  }
}
