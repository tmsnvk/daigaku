package net.tamasnovak.domains.application.application.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.domains.application.shared.persistence.ApplicationView;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
public class ApplicationServiceImpl implements ApplicationService {
  private final AuthenticationFacade authenticationFacade;
  private final ApplicationRepository applicationRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public ApplicationServiceImpl(AuthenticationFacade authenticationFacade, ApplicationRepository applicationRepository, GlobalServiceConstants globalServiceConstants) {
    this.authenticationFacade = authenticationFacade;
    this.applicationRepository = applicationRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

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
  public ApplicationDto getApplicationDtoByUuid(String uuid) {
    ApplicationView applicationView = applicationRepository.findApplicationViewByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

    verifyUserAccessToViewApplication(uuid);

    return new ApplicationDto(applicationView);
  }

  private void verifyUserAccessToViewApplication(String uuid) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();
    ApplicationIdsView application = applicationRepository.findApplicationRelatedIdsByUuid(UUID.fromString(uuid));

    if (Objects.equals(authAccount.getRoleName(), "ROLE_STUDENT")) {
      authAccount.verifyAuthAccountUuidAgainstAnother(application.getStudentOwnerAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }

    if (Objects.equals(authAccount.getRoleName(), "ROLE_MENTOR")) {
      authAccount.verifyAuthAccountUuidAgainstAnother(application.getStudentMentorAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }
  }
}
