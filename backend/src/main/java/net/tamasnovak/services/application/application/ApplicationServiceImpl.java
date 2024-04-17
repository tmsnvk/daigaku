package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.repositories.account.AccountRepository;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.application.ApplicationMapper;
import net.tamasnovak.utilities.ValidatorUtilities;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
public class ApplicationServiceImpl implements ApplicationService {
  private final ApplicationRepository applicationRepository;
  private final ApplicationMapper applicationMapper;
  private final ApplicationServiceConstants applicationServiceConstants;
  private final ValidatorUtilities validatorUtilities;
  private final AuthenticationFacade authenticationFacade;
  private final AccountRepository accountRepository;

  @Autowired
  public ApplicationServiceImpl(ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ApplicationServiceConstants applicationServiceConstants, ValidatorUtilities validatorUtilities, AuthenticationFacade authenticationFacade, AccountRepository accountRepository) {
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.applicationServiceConstants = applicationServiceConstants;
    this.validatorUtilities = validatorUtilities;
    this.authenticationFacade = authenticationFacade;
    this.accountRepository = accountRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto findByUuid(String uuid) {
    UUID validApplicationUuid = validatorUtilities.validateIfStringIsUuid(uuid, applicationServiceConstants.NO_APPLICATION_FOUND);

    Application application = applicationRepository.findByUuid(validApplicationUuid)
      .orElseThrow(() -> new EntityNotFoundException(applicationServiceConstants.NO_APPLICATION_FOUND));

    String applicationCreatedBy = accountRepository.findByEmail(application.getCreatedBy())
      .orElseThrow(() -> new EntityNotFoundException(applicationServiceConstants.USER_NOT_FOUND))
      .getFullName();
    String applicationLastModifiedBy = accountRepository.findByEmail(application.getLastModifiedBy())
      .orElseThrow(() -> new EntityNotFoundException(applicationServiceConstants.USER_NOT_FOUND))
      .getFullName();

    checkUserPermissionToViewApplication(validApplicationUuid, application);

    return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
  }

  private void checkUserPermissionToViewApplication(UUID applicationUuid, Application application) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_STUDENT")) {
      validatorUtilities.checkIfUuidsAreEqual(
        applicationUuid,
        application.getStudent().getAccount().getUuid(),
        applicationServiceConstants.NO_PERMISSION_AS_STUDENT
      );
    }

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_MENTOR")) {
      long applicationMentorId = application.getStudent().getMentor().getAccount().getId();
      long authAccountId = authAccount.getId();

      validatorUtilities.checkIfApplicationMentorIsValid(applicationMentorId, authAccountId, applicationServiceConstants.NO_PERMISSION_AS_MENTOR);
    }
  }
}
