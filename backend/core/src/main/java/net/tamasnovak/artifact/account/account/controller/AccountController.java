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
 * Controller class managing REST API requests related to "/api/v1/accounts" endpoint.
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/accounts")
public class AccountController {
  private final AuthenticationFacade authFacade;
  private final AccountService accountService;

  @Autowired
  public AccountController(AuthenticationFacade authFacade, AccountService accountService) {
    this.authFacade = authFacade;
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
  public ResponseEntity<AuthContextResponse> fetchAuthContextResponse() {
    final User userDetails = authFacade.getUserContext();
    final AuthContextResponse response = accountService.fetchAuthContextResponse(userDetails.getUsername());

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }

  /**
   * Authenticates and logs in the user based on the provided credentials.
   * The `@Valid` annotation validates the {@link LoginRequest} object as per its validation criteria.
   *
   * @param requestBody The login request body.
   * @return A {@link ResponseEntity} containing `HttpStatus.OK` status code and the {@link LoginResponse} object.
   */
  @PostMapping(value = "/log-in", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<LoginResponse> logInUser(@Valid @RequestBody final LoginRequest requestBody) {
    final Authentication authentication = authFacade.authenticateUser(requestBody.email(), requestBody.password());
    final LoginResponse response = accountService.fetchLoginResponse(requestBody, authentication);

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
