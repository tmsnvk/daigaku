package net.tamasnovak.utilities.authenticationFacade;

import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.services.account.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

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
    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, password);

    return authenticationManager.authenticate(auth);
  }

  @Override
  public Account getAuthenticatedAccount() {
    return accountService.findByEmail(getUserContext().getUsername());
  }

  @Override
  public String getAuthenticatedAccountRole() {
    return transformRolesArrayToString(getUserContext());
  }

  @Override
  public User getUserContext() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  @Override
  public User getUserDetails(Authentication authentication) {
    return (User) authentication.getPrincipal();
  }

  @Override
  public String transformRolesArrayToString(User userDetails) {
    String role = userDetails.getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .toList()
      .toString();

    return role.substring(1, role.length() - 1);
  }
}
