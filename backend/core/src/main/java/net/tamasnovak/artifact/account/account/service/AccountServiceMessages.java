/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.service;

import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.stereotype.Component;

/**
 * Stores {@link Account} entity service layer constants.
 */
@Component
public final class AccountServiceMessages {
  static final String EMAIL_ALREADY_EXISTS = "We could not use this email to register your account. Try a different one or contact " +
    "support.";
  static final String ACCOUNT_NOT_FOUND = "This email is not found in our database.";

  private AccountServiceMessages() {
    // Class should not be initialised.
  }
}
