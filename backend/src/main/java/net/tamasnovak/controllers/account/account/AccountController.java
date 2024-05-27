package net.tamasnovak.controllers.account.account;

import jakarta.validation.Valid;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.services.account.baseAccount.account.AccountCoreManager;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/accounts")
public class AccountController {
  private final AuthenticationFacade authenticationFacade;
  private final AccountCoreManager accountCoreManager;

  @Autowired
  public AccountController(AuthenticationFacade authenticationFacade, AccountCoreManager accountCoreManager) {
    this.authenticationFacade = authenticationFacade;
    this.accountCoreManager = accountCoreManager;
  }

  @GetMapping(value = "/me")
  @PreAuthorize("hasAnyRole('STUDENT', 'MENTOR', 'INSTITUTION_ADMIN', 'SYSTEM_ADMIN')")
  public ResponseEntity<ClientAuthContextDto> getClientAuthContext() {
    User userDetails = authenticationFacade.getUserContext();

    ClientAuthContextDto returnProjection = accountCoreManager.getClientAuthContextDto(userDetails.getUsername());

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjection);
  }

  @PostMapping(value = "/login")
  public ResponseEntity<LoginReturnDto> login(@Valid @RequestBody LoginRequestDto requestBody) {
    Authentication authentication = authenticationFacade.authenticateUser(requestBody.email(), requestBody.password());

    LoginReturnDto returnProjection = accountCoreManager.getLoginReturnDto(requestBody, authentication);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjection);
  }
}
