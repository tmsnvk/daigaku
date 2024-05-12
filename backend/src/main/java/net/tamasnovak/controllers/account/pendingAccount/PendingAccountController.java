package net.tamasnovak.controllers.account.pendingAccount;

import jakarta.validation.Valid;
import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.services.account.pendingAccount.PendingAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/pending-accounts")
public class PendingAccountController {
  private final PendingAccountService pendingAccountService;

  @Autowired
  public PendingAccountController(PendingAccountService pendingAccountService) {
    this.pendingAccountService = pendingAccountService;
  }

  @RequestMapping(
    value = "/register",
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<HttpStatus> register(
    @Valid @RequestBody PendingAccountRegistrationDto requestBody
  ) {
    pendingAccountService.createAccount(requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
