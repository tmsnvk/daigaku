package net.tamasnovak.controllers.pendingAccount;

import jakarta.validation.Valid;
import net.tamasnovak.dtos.account.access.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.email.SimpleEmailDto;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.account.pendingAccount.PendingAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/pending-accounts")
public class PendingAccountController {
  private final AccountService accountService;
  private final PendingAccountService pendingAccountServiceDefault;
  private final EmailService emailService;
  private final PendingAccountControllerConstants pendingAccountControllerConstants;

  @Autowired
  public PendingAccountController(AccountService accountService, PendingAccountService pendingAccountServiceDefault, EmailService emailService, PendingAccountControllerConstants pendingAccountControllerConstants) {
    this.accountService = accountService;
    this.pendingAccountServiceDefault = pendingAccountServiceDefault;
    this.emailService = emailService;
    this.pendingAccountControllerConstants = pendingAccountControllerConstants;
  }

  @RequestMapping(
    value = "/register",
    method = RequestMethod.POST,
    consumes = "application/json"
  )
  public ResponseEntity<HttpStatus> register(@Valid @RequestBody PendingAccountRegistrationDto registrationData) {
    pendingAccountServiceDefault.checkIfExistsByEmail(registrationData.email());
    accountService.checkIfExistsByEmail(registrationData.email());

    pendingAccountServiceDefault.addAccount(registrationData);

    String subject = pendingAccountControllerConstants.PENDING_ACCOUNT_EMAIL_SUBJECT;
    String body = pendingAccountControllerConstants.PENDING_ACCOUNT_EMAIL_BODY;
    SimpleEmailDto emailDetailsDTO = new SimpleEmailDto(registrationData.email(), subject, body);
    emailService.sendEmail(emailDetailsDTO);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
