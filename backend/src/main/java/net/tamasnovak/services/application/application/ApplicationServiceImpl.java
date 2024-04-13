package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.application.ApplicationMapper;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ApplicationServiceImpl implements ApplicationService {
  private final ApplicationRepository applicationRepository;
  private final ApplicationMapper applicationMapper;
  private final ApplicationServiceConstants applicationServiceConstants;
  private final ValidatorUtilities validatorUtilities;

  @Autowired
  public ApplicationServiceImpl(ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ApplicationServiceConstants applicationServiceConstants, ValidatorUtilities validatorUtilities) {
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.applicationServiceConstants = applicationServiceConstants;
    this.validatorUtilities = validatorUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto findByUuid(String uuid, UUID authStudentUuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid, applicationServiceConstants.NO_APPLICATION_FOUND);

    Application application = applicationRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(applicationServiceConstants.NO_APPLICATION_FOUND));

    validatorUtilities.checkIfUuidsAreEqual(validUuid, application.getStudentId().getAccountId().getUuid(), applicationServiceConstants.NO_PERMISSION_TO_VIEW_APPLICATION);

    return applicationMapper.toApplicationDto(application);
  }
}
