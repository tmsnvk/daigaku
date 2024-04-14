package net.tamasnovak.controllers.account.account;

import jakarta.validation.Valid;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.dtos.account.response.FrontendContextDto;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.security.utilities.JwtUtilities;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/accounts")
public class AccountController {
  private final AccountService accountService;
  private final JwtUtilities jwtUtilities;
  private final AuthenticationFacade authenticationFacade;

  @Autowired
  public AccountController(AccountService accountService, JwtUtilities jwtUtilities, AuthenticationFacade authenticationFacade) {
    this.accountService = accountService;
    this.jwtUtilities = jwtUtilities;
    this.authenticationFacade = authenticationFacade;
  }

  @RequestMapping(
    value = "/me",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @PreAuthorize("hasAnyRole('STUDENT', 'MENTOR', 'INSTITUTION_ADMIN', 'SYSTEM_ADMIN')")
  public ResponseEntity<FrontendContextDto> findUser() {
    User userDetails = authenticationFacade.getUserContext();

    Account account = accountService.findUserByEmail(userDetails.getUsername());
    String role = authenticationFacade.transformRolesArrayToString(userDetails);

    FrontendContextDto frontendContextDto = new FrontendContextDto(
      account.getEmail(),
      account.getFirstName(),
      account.getLastName(),
      account.getCreatedAt(),
      account.getLastUpdatedAt(),
      role
    );

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(frontendContextDto);
  }

  @RequestMapping(
    value = "/login",
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<LoginReturnDto> loginUser(@Valid @RequestBody LoginRequestDto loginData) {
    Authentication authentication = authenticationFacade.authenticateUser(loginData.email().toLowerCase(), loginData.password());
    User userDetails = authenticationFacade.getUserDetails(authentication);

    String jwtToken = jwtUtilities.generateJwtToken(authentication);

    Account account = accountService.findUserByEmail(loginData.email().toLowerCase());
    String role = authenticationFacade.transformRolesArrayToString(userDetails);

    LoginReturnDto loginReturnDto = new LoginReturnDto(
      account.getEmail(),
      account.getFirstName(),
      account.getLastName(),
      account.getCreatedAt(),
      account.getLastUpdatedAt(),
      jwtToken,
      role
    );

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(loginReturnDto);
  }
}
