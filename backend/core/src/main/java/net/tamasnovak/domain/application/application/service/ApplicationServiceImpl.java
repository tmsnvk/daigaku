package net.tamasnovak.domain.application.application.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domain.account.account.entity.Account;
import net.tamasnovak.domain.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.domain.application.shared.dto.ApplicationData;
import net.tamasnovak.domain.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.domain.application.shared.persistence.ApplicationView;
import net.tamasnovak.domain.shared.constants.GlobalServiceConstants;
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
  private final GlobalServiceConstants globalConstants;

  @Autowired
  public ApplicationServiceImpl(AuthenticationFacade authenticationFacade, ApplicationRepository applicationRepository, GlobalServiceConstants globalConstants) {
    this.authenticationFacade = authenticationFacade;
    this.applicationRepository = applicationRepository;
    this.globalConstants = globalConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public net.tamasnovak.domain.application.shared.entity.Application getByUuid(final UUID uuid) {
    return applicationRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "SingleApplicationRecordByUuid", key = "{ #uuid }")
  public ApplicationData getApplicationDtoByUuid(final UUID uuid) {
    final ApplicationView applicationView = applicationRepository.findApplicationViewByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));

    verifyUserAccessToViewApplication(uuid);

    return new ApplicationData(applicationView);
  }

  private void verifyUserAccessToViewApplication(final UUID uuid) {
    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final ApplicationIdsView application = applicationRepository.findApplicationRelatedIdsByUuid(uuid);

    if (Objects.equals(authAccount.getRoleName(), "ROLE_STUDENT")) {
      authAccount.verifyAuthAccountUuidAgainstAnother(application.getStudentOwnerAccountUuid(), globalConstants.NO_PERMISSION);
    }

    if (Objects.equals(authAccount.getRoleName(), "ROLE_MENTOR")) {
      authAccount.verifyAuthAccountUuidAgainstAnother(application.getStudentMentorAccountUuid(), globalConstants.NO_PERMISSION);
    }
  }
}
