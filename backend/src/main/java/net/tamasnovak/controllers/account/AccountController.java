package net.tamasnovak.controllers.account;

import net.tamasnovak.dtos.account.AccountLoginReturnDto;
import net.tamasnovak.dtos.account.access.AccountGetMeDto;
import net.tamasnovak.dtos.account.access.AccountLoginDto;
import net.tamasnovak.dtos.account.access.PendingAccountRegistrationDto;
import net.tamasnovak.dtos.account.response.AccountDataDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.exceptions.FormErrorException;
import net.tamasnovak.security.JwtResponse;
import net.tamasnovak.security.JwtUtils;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.account.pendingAccount.PendingAccountService;
import net.tamasnovak.utilities.StringFormatterUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/users")
public class AccountController {
  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;
  private final AuthenticationManager authenticationManager;
  private final AccountService accountService;
  private final AccountControllerMessages accountControllerMessages;
  private final PendingAccountService pendingAccountServiceDefault;
  private final EmailService emailService;
  private final StringFormatterUtilities stringFormatter;

  @Autowired
  public AccountController(PasswordEncoder encoder, JwtUtils jwtUtils, AuthenticationManager authenticationManager, AccountService accountService, AccountControllerMessages accountControllerMessages, PendingAccountService pendingAccountServiceDefault, EmailService emailService, StringFormatterUtilities stringFormatter) {
    this.encoder = encoder;
    this.jwtUtils = jwtUtils;
    this.authenticationManager = authenticationManager;
    this.accountService = accountService;
    this.accountControllerMessages = accountControllerMessages;
    this.pendingAccountServiceDefault = pendingAccountServiceDefault;
    this.emailService = emailService;
    this.stringFormatter = stringFormatter;
  }

  @RequestMapping(
    value = "/me",
    method = RequestMethod.GET,
    produces = "application/json"
  )
  @ResponseStatus(HttpStatus.OK)
  @PreAuthorize("hasAnyRole('STUDENT', 'MENTOR', 'ADMIN')")
  public ResponseEntity<AccountGetMeDto> findUser() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Account foundAccount = accountService.findUserByEmail(userDetails.getUsername());
    String accountRole = stringFormatter.transformRolesArray(userDetails);

    AccountDataDto accountDataDto = new AccountDataDto(
      foundAccount.getEmail(),
      foundAccount.getFirstName(),
      foundAccount.getLastName(),
      foundAccount.getCreatedAt(),
      foundAccount.getLastUpdatedAt()
    );

    AccountGetMeDto accountGetMeDto = new AccountGetMeDto(
      accountDataDto,
      accountRole
    );

    return new ResponseEntity<>(accountGetMeDto, HttpStatus.OK);
  }

  @RequestMapping(
    value = "/login",
    method = RequestMethod.POST,
    consumes = "application/json",
    produces = "application/json"
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<AccountLoginReturnDto> login(@RequestBody AccountLoginDto loginData) {
    if (isLoginFormDataValidated(loginData)) {
      throw new FormErrorException(accountControllerMessages.LOGIN_ERROR_MESSAGE);
    }

    Account foundAccount = accountService.findUserByEmail(loginData.email().toLowerCase());

    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(loginData.email().toLowerCase(), loginData.password());
    Authentication authentication = authenticationManager.authenticate(auth);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwtToken = jwtUtils.generateJwtToken(authentication);
    User userDetails = (User) authentication.getPrincipal();

    String accountRole = stringFormatter.transformRolesArray(userDetails);

    JwtResponse jwtResponse = new JwtResponse(
      jwtToken,
      userDetails.getUsername(),
      accountRole
    );

    AccountDataDto accountDataDto = new AccountDataDto(
      foundAccount.getEmail(),
      foundAccount.getFirstName(),
      foundAccount.getLastName(),
      foundAccount.getCreatedAt(),
      foundAccount.getLastUpdatedAt()
    );
    AccountLoginReturnDto accountLoginReturnData = new AccountLoginReturnDto(
      accountDataDto,
      jwtResponse
    );

    return new ResponseEntity<>(accountLoginReturnData, HttpStatus.OK);
  }

  private boolean isLoginFormDataValidated(AccountLoginDto userLoginData) {
    return userLoginData == null || userLoginData.email().isEmpty() || userLoginData.password().isEmpty();
  }
}
