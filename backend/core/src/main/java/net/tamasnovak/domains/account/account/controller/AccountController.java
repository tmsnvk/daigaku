package net.tamasnovak.domains.account.account.controller;

import jakarta.validation.Valid;
import net.tamasnovak.domains.account.account.dto.LoginRequest;
import net.tamasnovak.domains.account.account.dto.ClientAuthContext;
import net.tamasnovak.domains.account.account.dto.LoginResponse;
import net.tamasnovak.domains.account.account.service.AccountService;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
  private final AccountService accountService;

  @Autowired
  public AccountController(AuthenticationFacade authenticationFacade, AccountService accountService) {
    this.authenticationFacade = authenticationFacade;
    this.accountService = accountService;
  }

  @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
  @PreAuthorize("hasAnyRole('STUDENT', 'MENTOR', 'INSTITUTION_ADMIN', 'SYSTEM_ADMIN')")
  public ResponseEntity<ClientAuthContext> getClientAuthContext() {
    final User userDetails = authenticationFacade.getUserContext();
    final ClientAuthContext response = accountService.getClientAuthContextDto(userDetails.getUsername());

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody final LoginRequest requestBody) {
    final Authentication authentication = authenticationFacade.authenticateUser(requestBody.email(), requestBody.password());
    final LoginResponse response = accountService.getLoginReturnDto(requestBody, authentication);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
