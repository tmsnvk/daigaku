/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.service;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.common.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.common.persistence.ApplicationView;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.enums.roles.AuthorisationRoles;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import net.tamasnovak.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Application} entity-related operations, implementing {@link ApplicationService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "ApplicationService")
public class ApplicationServiceImpl implements ApplicationService {
  private final AuthenticationFacade authenticationFacade;
  private final ApplicationRepository applicationRepository;

  @Autowired
  public ApplicationServiceImpl(
    AuthenticationFacade authenticationFacade, ApplicationRepository applicationRepository) {
    this.authenticationFacade = authenticationFacade;
    this.applicationRepository = applicationRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public Application findApplicationByUuid(final UUID applicationUuid) {
    return applicationRepository.findApplicationByUuid(applicationUuid)
                                .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "SingleApplicationRecordByUuid", key = "{ #applicationUuid }")
  public ApplicationData createApplicationData(final UUID applicationUuid) {
    this.validateUserAccessToViewApplication(applicationUuid);

    final ApplicationView applicationView = applicationRepository.findApplicationViewByUuid(applicationUuid)
                                                                 .orElseThrow(() -> new EntityNotFoundException(
                                                                   GlobalServiceMessages.NO_RECORD_FOUND));

    return new ApplicationData(applicationView);
  }

  /**
   * Verifies that the authenticated user has permission to view the provided {@link Application}. The method checks the authenticated
   * user's role and ensures they have the correct association with the specified {@link Application} to access it.
   * If the user is a {@link Student}, they must match the {@link Application}'s owner uuid.
   * If the user is a {@link Mentor}, they must match the {@link Application}'s assigned mentor uuid.
   *
   * @param applicationUuid The application's uuid the user is attempting to access.
   */
  private void validateUserAccessToViewApplication(final UUID applicationUuid) {
    if (applicationUuid == null) {
      throw new IllegalArgumentException(ApplicationServiceMessages.INVALID_UUID);
    }

    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final ApplicationIdsView application = applicationRepository.findApplicationRelatedIdsByUuid(applicationUuid);

    if (StringUtils.validateStringsAreEqual(authAccount.fetchRoleName(), AuthorisationRoles.ROLE_STUDENT.name())) {
      authAccount.verifyAccountUuidMatch(application.getStudentOwnerAccountUuid(), GlobalServiceMessages.NO_PERMISSION);
    }

    if (StringUtils.validateStringsAreEqual(authAccount.fetchRoleName(), AuthorisationRoles.ROLE_MENTOR.name())) {
      authAccount.verifyAccountUuidMatch(application.getStudentMentorAccountUuid(), GlobalServiceMessages.NO_PERMISSION);
    }
  }
}
