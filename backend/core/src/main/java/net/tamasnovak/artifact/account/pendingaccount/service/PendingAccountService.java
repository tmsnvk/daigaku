/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.service;

import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegisterRequest;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import org.springframework.dao.DataIntegrityViolationException;

/**
 * Service interface managing {@link PendingAccount} entity-related API calls towards the database.
 *
 * @since 0.0.1
 */
public interface PendingAccountService {
  /**
   * Validates that no {@link PendingAccount} exists with the provided email.
   *
   * @param email The email to check for an existing account.
   * @throws DataIntegrityViolationException If a pending account with the provided email already exists.
   */
  void validateAccountDoesNotExist(String email);

  /**
   * Creates a {@link PendingAccount}.
   *
   * @param requestBody The pending account object containing the user's details.
   */
  void createPendingAccount(PendingAccountRegisterRequest requestBody);
}
