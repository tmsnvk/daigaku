package net.tamasnovak.domains.application.application.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.account.account.entity.Account;
import net.tamasnovak.domains.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.domains.application.shared.dto.ApplicationData;
import net.tamasnovak.domains.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.domains.application.shared.persistence.ApplicationView;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

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
  public net.tamasnovak.domains.application.shared.entity.Application getByUuid(final String uuid) {
    return applicationRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "SingleApplicationRecordByUuid", key = "{ #uuid }")
  public ApplicationData getApplicationDtoByUuid(final String uuid) {
    final ApplicationView applicationView = applicationRepository.findApplicationViewByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

    verifyUserAccessToViewApplication(uuid);

    return new ApplicationData(applicationView);
  }

  private void verifyUserAccessToViewApplication(final String uuid) {
    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final ApplicationIdsView application = applicationRepository.findApplicationRelatedIdsByUuid(UUID.fromString(uuid));

    if (Objects.equals(authAccount.getRoleName(), "ROLE_STUDENT")) {
      authAccount.verifyAuthAccountUuidAgainstAnother(application.getStudentOwnerAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }

    if (Objects.equals(authAccount.getRoleName(), "ROLE_MENTOR")) {
      authAccount.verifyAuthAccountUuidAgainstAnother(application.getStudentMentorAccountUuid(), globalServiceConstants.NO_PERMISSION);
    }
  }
}
