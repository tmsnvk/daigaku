package net.tamasnovak.utilities.authenticationFacade;

import net.tamasnovak.entities.account.Account;

public interface AuthenticationFacade {
  Account getAuthenticatedAccount();
  String getAuthenticatedAccountRole();
}
