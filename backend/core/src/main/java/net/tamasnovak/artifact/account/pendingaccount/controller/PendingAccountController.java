package net.tamasnovak.artifact.account.pendingaccount.controller;

import jakarta.validation.Valid;
import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegistration;
import net.tamasnovak.artifact.account.pendingaccount.service.PendingAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/pending-accounts")
public class PendingAccountController {
  private final PendingAccountService pendingAccountService;

  @Autowired
  public PendingAccountController(PendingAccountService pendingAccountService) {
    this.pendingAccountService = pendingAccountService;
  }

  @PostMapping(
    value = "/register")
  public ResponseEntity<HttpStatus> registerUser(@Valid @RequestBody final PendingAccountRegistration requestBody) {
    pendingAccountService.createPendingAccount(requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
