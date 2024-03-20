package net.tamasnovak.controllers.pendingAccount;

import jakarta.validation.Valid;
import net.tamasnovak.dtos.account.access.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.email.NewEmailDto;
import net.tamasnovak.services.account.account.AccountServiceImpl;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.account.pendingAccount.PendingAccountServiceImpl;
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
  private final AccountServiceImpl accountServiceImpl;
  private final PendingAccountServiceImpl pendingAccountServiceImpl;
  private final EmailService emailService;
  private final PendingAccountControllerConstants pendingAccountControllerConstants;

  @Autowired
  public PendingAccountController(AccountServiceImpl accountServiceImpl, PendingAccountServiceImpl pendingAccountServiceImpl, EmailService emailService, PendingAccountControllerConstants pendingAccountControllerConstants) {
    this.accountServiceImpl = accountServiceImpl;
    this.pendingAccountServiceImpl = pendingAccountServiceImpl;
    this.emailService = emailService;
    this.pendingAccountControllerConstants = pendingAccountControllerConstants;
  }

  @RequestMapping(
    value = "/register",
    method = RequestMethod.POST,
    consumes = "application/json"
  )
  public ResponseEntity<HttpStatus> register(@Valid @RequestBody PendingAccountRegistrationDto registrationData) {
    pendingAccountServiceImpl.checkIfExistsByEmail(registrationData.email());
    accountServiceImpl.checkIfExistsByEmail(registrationData.email());

    pendingAccountServiceImpl.addAccount(registrationData);

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
