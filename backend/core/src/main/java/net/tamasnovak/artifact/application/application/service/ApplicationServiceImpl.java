/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.service;

import java.util.Objects;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationView;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Application} entity-related API operations, implementing {@link ApplicationService}.
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
    validateUserAccessToViewApplication(applicationUuid);

    final ApplicationView applicationView = applicationRepository.findApplicationViewByUuid(applicationUuid)
                                                                 .orElseThrow(() -> new EntityNotFoundException(
                                                                   GlobalServiceMessages.NO_RECORD_FOUND));

    return new ApplicationData(applicationView);
  }

  /**
   * Verifies that the authenticated user has permission to view an application. The method checks the authenticated user's role and
   * ensures they have the correct association with the specified {@link Application} to access it.
   * If the user is a student, they must match the application's owner uuid.
   * If the user is a mentor, they must match the application's assigned mentor uuid.
   *
   * @param uuid The uuid of the application the user is attempting to access.
   */
  private void validateUserAccessToViewApplication(final UUID uuid) {
    final Account authAccount = authenticationFacade.getAuthenticatedAccount();
    final ApplicationIdsView application = applicationRepository.findApplicationRelatedIdsByUuid(uuid);

    if (Objects.equals(authAccount.fetchRoleName(), "ROLE_STUDENT")) {
      authAccount.verifyAccountUuidMatch(application.getStudentOwnerAccountUuid(), GlobalServiceMessages.NO_PERMISSION);
    }

    if (Objects.equals(authAccount.fetchRoleName(), "ROLE_MENTOR")) {
      authAccount.verifyAccountUuidMatch(application.getStudentMentorAccountUuid(), GlobalServiceMessages.NO_PERMISSION);
    }
  }
}
