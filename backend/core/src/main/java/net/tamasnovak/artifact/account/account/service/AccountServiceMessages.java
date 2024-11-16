/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.service;

import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.stereotype.Component;

/**
 * Stores {@link Account} entity service layer constants.
 *
 * @since 0.0.1
 */
@Component
public final class AccountServiceMessages {
  static final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";
  static final String ACCOUNT_NOT_FOUND = "This email is not found in our database.";

  private AccountServiceMessages() {
    // Class should not be initialised.
  }
}
