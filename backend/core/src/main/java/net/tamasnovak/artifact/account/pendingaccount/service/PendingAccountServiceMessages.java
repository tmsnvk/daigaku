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
 *
 * @since 0.0.1
 */
@Component
public final class PendingAccountServiceMessages {
  static final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";

  private PendingAccountServiceMessages() {
    // Class should not be initialised.
  }
}
