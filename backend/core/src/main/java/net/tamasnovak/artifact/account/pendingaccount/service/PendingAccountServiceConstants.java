/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.service;

import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import org.springframework.stereotype.Component;

/**
 * Stores {@link PendingAccount} artifact service layer constants.
 *
 * @since 0.0.1
 */
@Component
public final class PendingAccountServiceConstants {
  static final String EMAIL_ALREADY_EXISTS = "This email is already registered in our system.";

  private PendingAccountServiceConstants() {
    // Class should not be initialised.
  }
}
