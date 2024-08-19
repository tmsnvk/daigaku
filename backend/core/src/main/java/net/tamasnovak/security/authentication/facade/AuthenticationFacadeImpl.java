package net.tamasnovak.security.authentication.facade;

import net.tamasnovak.domain.account.account.entity.Account;
import net.tamasnovak.domain.account.account.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {
  private final AuthenticationManager authenticationManager;
  private final AccountService accountService;

  @Autowired
  public AuthenticationFacadeImpl(AuthenticationManager authenticationManager, AccountService accountService) {
    this.authenticationManager = authenticationManager;
    this.accountService = accountService;
  }

  @Override
  public Authentication authenticateUser(String email, String password) {
    final UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email.toLowerCase(), password);

    return authenticationManager.authenticate(auth);
  }

  @Override
  public Account getAuthenticatedAccount() {
    return accountService.getByEmail(getUserContext().getUsername());
  }

  @Override
  public User getUserContext() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  @Override
  public UUID getAuthenticatedAccountUuid() {
    return getAuthenticatedAccount().getUuid();
  }
}
