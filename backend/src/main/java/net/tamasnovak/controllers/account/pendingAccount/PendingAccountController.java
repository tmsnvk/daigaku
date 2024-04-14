package net.tamasnovak.controllers.account.pendingAccount;

import jakarta.validation.Valid;
import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.email.NewEmailDto;
import net.tamasnovak.services.account.pendingAccount.PendingAccountService;
import net.tamasnovak.services.email.EmailService;
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
  private final EmailService emailService;
  private final PendingAccountControllerConstants pendingAccountControllerConstants;

  @Autowired
  public PendingAccountController(PendingAccountService pendingAccountService, EmailService emailService, PendingAccountControllerConstants pendingAccountControllerConstants) {
    this.pendingAccountService = pendingAccountService;
    this.emailService = emailService;
    this.pendingAccountControllerConstants = pendingAccountControllerConstants;
  }

  @RequestMapping(
    value = "/register",
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<HttpStatus> register(@Valid @RequestBody PendingAccountRegistrationDto registrationData) {
    pendingAccountService.addAccount(registrationData);

    NewEmailDto newEmail = new NewEmailDto(
      registrationData.email(),
      pendingAccountControllerConstants.PENDING_ACCOUNT_EMAIL_SUBJECT,
      pendingAccountControllerConstants.PENDING_ACCOUNT_EMAIL_BODY
    );
    emailService.sendEmail(newEmail);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .build();
  }
}
