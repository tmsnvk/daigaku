package net.tamasnovak.utilities.authenticationFacade;

import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.services.account.baseAccount.account.AccountCoreManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component
public class SimpleAuthenticationFacade implements AuthenticationFacade {
  private final AuthenticationManager authenticationManager;
  private final AccountCoreManager accountCoreManager;

  @Autowired
  public SimpleAuthenticationFacade(AuthenticationManager authenticationManager, AccountCoreManager accountCoreManager) {
    this.authenticationManager = authenticationManager;
    this.accountCoreManager = accountCoreManager;
  }

  @Override
  public Authentication authenticateUser(String email, String password) {
    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email.toLowerCase(), password);

    return authenticationManager.authenticate(auth);
  }

  @Override
  public Account getAuthenticatedAccount() {
    return accountCoreManager.getAccountByEmail(getUserContext().getUsername());
  }

  @Override
  public User getUserContext() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
