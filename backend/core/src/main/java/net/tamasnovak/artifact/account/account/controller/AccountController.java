/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.controller;

import jakarta.validation.Valid;
import net.tamasnovak.artifact.account.account.dto.AuthContextResponse;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.account.service.AccountService;
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

/**
 * Controller class that manages REST API requests related to "/api/v1/accounts" endpoint.
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/accounts")
public class AccountController {
  private final AuthenticationFacade authenticationFacade;
  private final AccountService accountService;

  @Autowired
  public AccountController(AuthenticationFacade authenticationFacade, AccountService accountService) {
    this.authenticationFacade = authenticationFacade;
    this.accountService = accountService;
  }

  /**
   * Fetches the authentication context object {@link AuthContextResponse} for the currently logged-in user.
   * On the frontend, the object is used by the authentication context to verify that the user is still logged in.
   *
   * @return ResponseEntity Contains `HttpStatus.OK` status code and the {@link AuthContextResponse} object.
   */
  @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
  @PreAuthorize("hasAnyRole('STUDENT', 'MENTOR', 'INSTITUTION_ADMIN', 'SYSTEM_ADMIN')")
  public ResponseEntity<AuthContextResponse> retrieveAuthContextResponse() {
    final User userDetails = authenticationFacade.getUserContext();
    final AuthContextResponse response = accountService.retrieveAuthContextResponseByAccountEmail(userDetails.getUsername());

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }

  /**
   * Authenticates the user and logs them in based on the provided credentials.
   * The `@Valid` annotation validates the {@link LoginRequest} object as per its validation criteria.
   *
   * @param requestBody The login request body.
   * @return ResponseEntity Contains `HttpStatus.OK` status code and the {@link LoginResponse} object.
   */
  @PostMapping(value = "/log-in", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<LoginResponse> logInUser(@Valid @RequestBody final LoginRequest requestBody) {
    final Authentication authentication = authenticationFacade.authenticateUser(requestBody.email(), requestBody.password());
    final LoginResponse response = accountService.retrieveLoginResponse(requestBody, authentication);

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
