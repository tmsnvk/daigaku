/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.security.authentication.facade;

import java.util.UUID;

import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;

public interface AuthenticationFacade {
  Authentication authenticateUser(String email, String password);

  Account getAuthenticatedAccount();

  User getUserContext();

  UUID retrieveAuthAccountUuid();
}
