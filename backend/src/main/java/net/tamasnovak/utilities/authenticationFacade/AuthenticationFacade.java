package net.tamasnovak.utilities.authenticationFacade;

import net.tamasnovak.entities.account.baseAccount.Account;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;

public interface AuthenticationFacade {
  Authentication authenticateUser(String email, String password);
  Account getAuthenticatedAccount();
  User getUserContext();
}
