/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.service;

import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegistrationRequest;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import org.springframework.dao.DataIntegrityViolationException;

/**
 * Service interface managing {@link PendingAccount} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface PendingAccountService {
  /**
   * Validates that no {@link PendingAccount} exists with the provided email.
   *
   * @param email The email to check for an existing account.
   * @throws DataIntegrityViolationException Thrown if a pending account with the provided email already exists.
   */
  void validateAccountDoesNotExist(String email);

  /**
   * Creates a {@link PendingAccount}.
   *
   * @param requestBody The request body object containing the user's details.
   */
  void createPendingAccount(PendingAccountRegistrationRequest requestBody);
}
