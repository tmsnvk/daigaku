/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.pendingaccount.controller;

import jakarta.validation.Valid;
import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegistrationRequest;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.account.pendingaccount.service.PendingAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/pending-accounts" endpoint.
 */
@RestController
@RequestMapping(path = "/api/v1/pending-accounts")
public class PendingAccountController {
  private final PendingAccountService pendingAccountService;

  @Autowired
  public PendingAccountController(PendingAccountService pendingAccountService) {
    this.pendingAccountService = pendingAccountService;
  }

  /**
   * Creates a {@link PendingAccount} object in the database.
   * The {@link Valid} annotation validates the {@link PendingAccountRegistrationRequest} object as per its validation criteria.
   *
   * @param requestBody The registration request body.
   * @return A {@link ResponseEntity} containing a {@link HttpStatus#OK} status code.
   */
  @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<HttpStatus> registerUser(@Valid @RequestBody final PendingAccountRegistrationRequest requestBody) {
    pendingAccountService.createPendingAccount(requestBody);

    return ResponseEntity.status(HttpStatus.CREATED)
                         .build();
  }
}
