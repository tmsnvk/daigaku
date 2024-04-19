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
  private final AccountRepository accountRepository;
  private final AuthenticationFacade authenticationFacade;
  private final ApplicationMapper applicationMapper;
  private final ApplicationConstants applicationConstants;
  private final ValidatorUtilities validatorUtilities;

  @Autowired
  public ApplicationServiceImpl(ApplicationRepository applicationRepository, AccountRepository accountRepository, AuthenticationFacade authenticationFacade, ApplicationMapper applicationMapper, ApplicationConstants applicationConstants, ValidatorUtilities validatorUtilities) {
    this.applicationRepository = applicationRepository;
    this.accountRepository = accountRepository;
    this.authenticationFacade = authenticationFacade;
    this.applicationMapper = applicationMapper;
    this.applicationConstants = applicationConstants;
    this.validatorUtilities = validatorUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto findByUuid(String uuid) {
    UUID validApplicationUuid = validatorUtilities.validateIfStringIsUuid(uuid, applicationConstants.NO_APPLICATION_FOUND);

    Application application = applicationRepository.findByUuid(validApplicationUuid)
      .orElseThrow(() -> new EntityNotFoundException(applicationConstants.NO_APPLICATION_FOUND));

    String applicationCreatedBy = accountRepository.findByEmail(application.getCreatedBy())
      .orElseThrow(() -> new EntityNotFoundException(applicationConstants.USER_NOT_FOUND))
      .getFullName();
    String applicationLastModifiedBy = accountRepository.findByEmail(application.getLastModifiedBy())
      .orElseThrow(() -> new EntityNotFoundException(applicationConstants.USER_NOT_FOUND))
      .getFullName();

    checkUserPermissionToViewApplication(application);

    return applicationMapper.toApplicationDto(application, applicationCreatedBy, applicationLastModifiedBy);
  }

  private void checkUserPermissionToViewApplication(Application application) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_STUDENT")) {
      validatorUtilities.checkIfUuidsAreEqual(
        authAccount.getUuid(),
        application.getStudent().getAccount().getUuid(),
        applicationConstants.NO_PERMISSION_AS_STUDENT
      );
    }

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_MENTOR")) {
      long applicationMentorId = application.getStudent().getMentor().getAccount().getId();
      long authAccountId = authAccount.getId();

      validatorUtilities.checkIfApplicationMentorIsValid(
        applicationMentorId,
        authAccountId,
        applicationConstants.NO_PERMISSION_AS_MENTOR
      );
    }
  }
}
