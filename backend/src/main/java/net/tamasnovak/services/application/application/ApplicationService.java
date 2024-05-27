package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.applicationView.ApplicationView;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.dtos.application.service.ApplicationIdsView;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import net.tamasnovak.utilities.mapper.ApplicationMapper;
import net.tamasnovak.utilities.validator.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
@Qualifier(value = "ApplicationService")
public class ApplicationService implements ApplicationCoreService {
  private final AuthenticationFacade authenticationFacade;
  private final ApplicationRepository applicationRepository;
  private final GlobalServiceConstants globalServiceConstants;
  private final ValidatorUtilities validatorUtilities;
  private final ApplicationMapper applicationMapper;

  @Autowired
  public ApplicationService(AuthenticationFacade authenticationFacade, ApplicationRepository applicationRepository, GlobalServiceConstants globalServiceConstants, ValidatorUtilities validatorUtilities, ApplicationMapper applicationMapper) {
    this.authenticationFacade = authenticationFacade;
    this.applicationRepository = applicationRepository;
    this.globalServiceConstants = globalServiceConstants;
    this.validatorUtilities = validatorUtilities;
    this.applicationMapper = applicationMapper;
  }

  /*
   * ApplicationCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationByUuid", key = "{ #root.methodName, #uuid }")
  public Application getByUuid(String uuid) {
    return applicationRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ApplicationViewByUuid", key = "{ #root.methodName, #uuid }")
  public MappedApplicationView getMappedApplicationViewByUuid(String uuid) {
    ApplicationView applicationView = applicationRepository.findApplicationViewByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

    verifyUserAccessToViewApplication(uuid);

    return applicationMapper.toMappedApplicationView(applicationView);
  }

  private void verifyUserAccessToViewApplication(String uuid) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();
    ApplicationIdsView application = applicationRepository.findApplicationRelatedIdsByUuid(UUID.fromString(uuid));

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_STUDENT")) {
      validatorUtilities.verifyUuidMatch(authAccount.getUuid(), application.getStudentOwnerAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_MENTOR")) {
      validatorUtilities.verifyUuidMatch(authAccount.getUuid(), application.getStudentMentorAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }
  }
}
