package net.tamasnovak.controllers.account;

import net.tamasnovak.dtos.account.AccountDataAfterLoginDto;
import net.tamasnovak.dtos.account.AccountDataAfterRegistrationDto;
import net.tamasnovak.dtos.account.access.AccountLoginDto;
import net.tamasnovak.dtos.account.access.AccountRegistrationDto;
import net.tamasnovak.dtos.email.SimpleEmailDto;
import net.tamasnovak.exception.FormErrorException;
import net.tamasnovak.security.JwtUtils;
import net.tamasnovak.services.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.pedingAccount.PendingAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/users")
public final class AccountController {
  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;
  private final AuthenticationManager authenticationManager;
  private final AccountService accountService;
  private final AccountControllerMessages accountControllerMessages;
  private final PendingAccountService pendingAccountService;
  private final EmailService emailService;

  @Autowired
  public AccountController(PasswordEncoder encoder, JwtUtils jwtUtils, AuthenticationManager authenticationManager, AccountService accountService, AccountControllerMessages accountControllerMessages, PendingAccountService pendingAccountService, EmailService emailService) {
    this.encoder = encoder;
    this.jwtUtils = jwtUtils;
    this.authenticationManager = authenticationManager;
    this.accountService = accountService;
    this.accountControllerMessages = accountControllerMessages;
    this.pendingAccountService = pendingAccountService;
    this.emailService = emailService;
  }

  @PostMapping(value = "/register", consumes = "application/json")
  public ResponseEntity<AccountDataAfterRegistrationDto> register(@RequestBody AccountRegistrationDto registrationData) {
    if (isRegisterFormDataValidated(registrationData)) {
      throw new FormErrorException(accountControllerMessages.FORM_ERROR_MESSAGE);
    }

    accountService.checkEmailInDatabase(registrationData.email());
    pendingAccountService.checkEmailInDatabase(registrationData.email());

    pendingAccountService.addAccount(registrationData);

    String subject = accountControllerMessages.PENDING_ACCOUNT_EMAIL_SUBJECT;
    String body = accountControllerMessages.PENDING_ACCOUNT_EMAIL_BODY;
    SimpleEmailDto emailDetailsDTO = new SimpleEmailDto(registrationData.email(), subject, body);
    emailService.sendEmail(emailDetailsDTO);

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<AccountDataAfterLoginDto> login(@RequestBody AccountLoginDto loginData) {
    // TODO - implement the method.
    AccountDataAfterLoginDto accountData = new AccountDataAfterLoginDto();

    return new ResponseEntity<>(accountData, HttpStatus.OK);
  }

  private boolean isRegisterFormDataValidated(AccountRegistrationDto userData) {
    return userData == null || userData.firstName().isEmpty() || userData.lastName().isEmpty() ||  userData.email().isEmpty();
  }
}
