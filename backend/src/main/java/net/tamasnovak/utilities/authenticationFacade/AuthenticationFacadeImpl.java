package net.tamasnovak.utilities.authenticationFacade;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.utilities.StringFormatterUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {
  private final AccountService accountService;
  private final StringFormatterUtilities stringFormatter;

  @Autowired
  public AuthenticationFacadeImpl(AccountService accountService, StringFormatterUtilities stringFormatter) {
    this.accountService = accountService;
    this.stringFormatter = stringFormatter;
  }

  @Override
  public Account getAuthenticatedAccount() {
    return accountService.findUserByEmail(getUserContext().getUsername());
  }

  @Override
  public String getAuthenticatedAccountRole() {
    return stringFormatter.transformRolesArrayToString(getUserContext());
  }

  private User getUserContext() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}
