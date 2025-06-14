/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.service;

import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import org.springframework.stereotype.Component;

/**
 * Stores {@link PendingAccount} entity service layer constants.
 */
@Component
public final class PendingAccountServiceMessages {
  static final String EMAIL_ALREADY_EXISTS = "We could not use this email to register your account. Try a different one or contact " +
    "support.";

  private PendingAccountServiceMessages() {
    // Class should not be initialised.
  }
}
