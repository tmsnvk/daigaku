package net.tamasnovak.services.application.application;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
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

  @Autowired
  public ApplicationServiceImpl(ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, ApplicationServiceConstants applicationServiceConstants, ValidatorUtilities validatorUtilities, AuthenticationFacade authenticationFacade) {
    this.applicationRepository = applicationRepository;
    this.applicationMapper = applicationMapper;
    this.applicationServiceConstants = applicationServiceConstants;
    this.validatorUtilities = validatorUtilities;
    this.authenticationFacade = authenticationFacade;
  }

  @Override
  @Transactional(readOnly = true)
  public ApplicationDto findByUuid(String uuid) {
    UUID validApplicationUuid = validatorUtilities.validateIfStringIsUuid(uuid, applicationServiceConstants.NO_APPLICATION_FOUND);

    Application application = applicationRepository.findByUuid(validApplicationUuid)
      .orElseThrow(() -> new EntityNotFoundException(applicationServiceConstants.NO_APPLICATION_FOUND));

    checkUserPermissionToViewApplication(validApplicationUuid, application);

    return applicationMapper.toApplicationDto(application);
  }

  private void checkUserPermissionToViewApplication(UUID applicationUuid, Application application) {
    Account authAccount = authenticationFacade.getAuthenticatedAccount();

    if (Objects.equals(authAccount.getRoleId().getName(), "ROLE_STUDENT")) {
      validatorUtilities.checkIfUuidsAreEqual(applicationUuid, application.getStudentId().getAccountId().getUuid(), applicationServiceConstants.NO_PERMISSION_AS_STUDENT);
    }

    if (Objects.equals(authAccount.getRoleId().getName(), "ROLE_MENTOR")) {
      long applicationMentorId = application.getStudentId().getMentorId().getAccountId().getId();
      long authAccountId = authAccount.getId();

      validatorUtilities.checkIfApplicationMentorIsValid(applicationMentorId, authAccountId, applicationServiceConstants.NO_PERMISSION_AS_MENTOR);
    }
  }
}
