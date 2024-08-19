package net.tamasnovak.security.authentication.facade;

import net.tamasnovak.artifact.account.account.entity.Account;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;

import java.util.UUID;

public interface AuthenticationFacade {
  Authentication authenticateUser(String email, String password);

  Account getAuthenticatedAccount();

  User getUserContext();

  UUID getAuthenticatedAccountUuid();
}
