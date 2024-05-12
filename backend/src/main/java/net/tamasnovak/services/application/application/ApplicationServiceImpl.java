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
  private final AuthenticationFacade authenticationFacade;
  private final AccountService accountService;
  private final ApplicationRepository applicationRepository;
  private final ApplicationMapper applicationMapper;
  private final ApplicationConstants applicationConstants;
  private final ValidatorUtilities validatorUtilities;

  @Autowired
  public ApplicationServiceImpl(AuthenticationFacade authenticationFacade, AccountService accountService, ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ApplicationConstants applicationConstants, ValidatorUtilities validatorUtilities) {
    this.authenticationFacade = authenticationFacade;
    this.accountService = accountService;
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.applicationConstants = applicationConstants;
    this.validatorUtilities = validatorUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto getApplicationDtoByUuid(String uuid) {
    Application application = getApplicationByUuid(uuid);

    verifyUserAccessToViewApplication(application);

    String createdBy = accountService.getAccountByEmail(application.getCreatedBy()).getFullName();
    String lastModifiedBy = accountService.getAccountByEmail(application.getLastModifiedBy()).getFullName();

    return applicationMapper.toApplicationDto(application, createdBy, lastModifiedBy);
  }

  @Override
  @Transactional(readOnly = true)
  public Application getApplicationByUuid(String uuid) {
    return applicationRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(applicationConstants.NO_APPLICATION_FOUND));
  }

  private void verifyUserAccessToViewApplication(Application application) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_STUDENT")) {
      validatorUtilities.verifyUuidMatch(
        authAccount.getUuid(),
        application.getStudent().getAccount().getUuid(),
        applicationConstants.NO_PERMISSION_AS_STUDENT
      );
    }

    if (Objects.equals(authAccount.getRole().getName(), "ROLE_MENTOR")) {
      validatorUtilities.verifyUuidMatch(
        authAccount.getUuid(),
        application.getStudent().getMentor().getAccount().getUuid(),
        applicationConstants.NO_PERMISSION_AS_MENTOR
      );
    }
  }
}
