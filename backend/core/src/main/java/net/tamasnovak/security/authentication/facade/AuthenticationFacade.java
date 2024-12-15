/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.security.authentication.facade;

import java.util.UUID;

import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;

/**
 * TODO
 *
 * @since 0.0.1
 */
public interface AuthenticationFacade {
  /**
   * TODO
   *
   * @param email
   * @param password
   * @return
   */
  Authentication authenticateUser(String email, String password);

  /**
   * TODO
   *
   * @return
   */
  Account getAuthenticatedAccount();

  /**
   * TODO
   *
   * @return
   */
  User getUserContext();

  /**
   * TODO
   *
   * @return
   */
  UUID retrieveAuthAccountUuid();
}
