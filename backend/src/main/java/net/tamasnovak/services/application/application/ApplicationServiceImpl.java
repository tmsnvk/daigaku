package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.repositories.application.ApplicationRepository;
import net.tamasnovak.services.account.account.AccountService;
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
  private final AccountService accountService;
  private final ApplicationRepository applicationRepository;
  private final AuthenticationFacade authenticationFacade;
  private final ApplicationMapper applicationMapper;
  private final ApplicationConstants applicationConstants;
  private final ValidatorUtilities validatorUtilities;

  @Autowired
  public ApplicationServiceImpl(AccountService accountService, ApplicationRepository applicationRepository, AuthenticationFacade authenticationFacade, ApplicationMapper applicationMapper, ApplicationConstants applicationConstants, ValidatorUtilities validatorUtilities) {
    this.accountService = accountService;
    this.applicationRepository = applicationRepository;
    this.authenticationFacade = authenticationFacade;
    this.applicationMapper = applicationMapper;
    this.applicationConstants = applicationConstants;
    this.validatorUtilities = validatorUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto getApplicationDtoByUuid(String uuid) {
    Application application = findByUuid(uuid);

    String createdBy = accountService.findByEmail(application.getCreatedBy()).getFullName();
    String lastModifiedBy = accountService.findByEmail(application.getLastModifiedBy()).getFullName();

    checkUserPermissionToViewApplication(application);

    return applicationMapper.toApplicationDto(application, createdBy, lastModifiedBy);
  }

  @Override
  @Transactional(readOnly = true)
  public Application findByUuid(String uuid) {
    return applicationRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(applicationConstants.NO_APPLICATION_FOUND));
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
      validatorUtilities.checkIfUuidsAreEqual(
        authAccount.getUuid(),
        application.getStudent().getMentor().getAccount().getUuid(),
        applicationConstants.NO_PERMISSION_AS_MENTOR
      );
    }
  }
}
