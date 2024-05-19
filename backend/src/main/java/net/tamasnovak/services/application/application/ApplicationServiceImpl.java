package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.ApplicationView;
import net.tamasnovak.dtos.application.service.ApplicationIdsView;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
public class ApplicationServiceImpl implements ApplicationService {
  private final AuthenticationFacade authenticationFacade;
  private final ApplicationRepository applicationRepository;
  private final GlobalServiceConstants globalServiceConstants;
  private final ValidatorUtilities validatorUtilities;

  @Autowired
  public ApplicationServiceImpl(AuthenticationFacade authenticationFacade, ApplicationRepository applicationRepository, GlobalServiceConstants globalServiceConstants, ValidatorUtilities validatorUtilities) {
    this.authenticationFacade = authenticationFacade;
    this.applicationRepository = applicationRepository;
    this.globalServiceConstants = globalServiceConstants;
    this.validatorUtilities = validatorUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationView getApplicationViewByUuid(String uuid) {
    ApplicationView applicationProjection = applicationRepository.findApplicationViewByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));

    if (applicationProjection != null) {
      verifyUserAccessToViewApplication(uuid);
    }

    return applicationProjection;
  }

  @Override
  @Transactional(readOnly = true)
  public Application getApplicationByUuid(String uuid) {
    return applicationRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
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
