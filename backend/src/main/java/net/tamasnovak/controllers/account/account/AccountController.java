package net.tamasnovak.controllers.account.account;

import jakarta.validation.Valid;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.dtos.account.response.GetMeDto;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.security.utilities.JwtUtilities;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.utilities.StringFormatterUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
  private final AuthenticationManager authenticationManager;
  private final StringFormatterUtilities stringFormatter;

  @Autowired
  public AccountController(AccountService accountService, JwtUtilities jwtUtilities, AuthenticationManager authenticationManager, StringFormatterUtilities stringFormatter) {
    this.accountService = accountService;
    this.jwtUtilities = jwtUtilities;
    this.authenticationManager = authenticationManager;
    this.stringFormatter = stringFormatter;
  }

  @RequestMapping(
    value = "/me",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @PreAuthorize("hasAnyRole('STUDENT', 'MENTOR', 'ADMIN')")
  public ResponseEntity<GetMeDto> findUser() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Account account = accountService.findUserByEmail(userDetails.getUsername());
    String role = stringFormatter.transformRolesArrayToString(userDetails);

    GetMeDto getMeDto = new GetMeDto(
      account.getEmail(),
      account.getFirstName(),
      account.getLastName(),
      account.getCreatedAt(),
      account.getLastUpdatedAt(),
      role
    );

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(getMeDto);
  }

  @RequestMapping(
    value = "/login",
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<LoginReturnDto> loginUser(@Valid @RequestBody LoginRequestDto loginData) {
    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(loginData.email().toLowerCase(), loginData.password());
    Authentication authentication = authenticationManager.authenticate(auth);

    Account account = accountService.findUserByEmail(loginData.email().toLowerCase());
    User userDetails = (User) authentication.getPrincipal();

    String jwtToken = jwtUtilities.generateJwtToken(authentication);
    String role = stringFormatter.transformRolesArrayToString(userDetails);

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
