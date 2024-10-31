package net.tamasnovak.artifact.application.application.service;

import java.util.Objects;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationView;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "ApplicationService")
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
  public net.tamasnovak.artifact.application.shared.entity.Application findByUuid(final UUID uuid) {
    return applicationRepository.findByUuid(uuid)
                                .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "SingleApplicationRecordByUuid", key = "{ #uuid }")
  public ApplicationData fetchApplicationDataByUuid(final UUID uuid) {
    final ApplicationView applicationView = applicationRepository.findApplicationViewByUuid(uuid)
                                                                 .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

    verifyUserAccessToViewApplication(uuid);

    return new ApplicationData(applicationView);
  }

  private void verifyUserAccessToViewApplication(final UUID uuid) {
    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final ApplicationIdsView application = applicationRepository.findApplicationRelatedIdsByUuid(uuid);

    if (Objects.equals(authAccount.getRoleName(), "ROLE_STUDENT")) {
      authAccount.verifyAccountUuidMatch(application.getStudentOwnerAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }

    if (Objects.equals(authAccount.getRoleName(), "ROLE_MENTOR")) {
      authAccount.verifyAccountUuidMatch(application.getStudentMentorAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }
  }
}
