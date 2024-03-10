package net.tamasnovak.controllers.application;

import lombok.RequiredArgsConstructor;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.services.account.AccountService;
import net.tamasnovak.services.application.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/applications")
@RequiredArgsConstructor
public final class ApplicationController {
  private final ApplicationService applicationService;
  private final AccountService accountService;

  @RequestMapping(
    value = "",
    method = RequestMethod.POST,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<ApplicationDto> saveApplication(@RequestBody NewApplicationDto newApplicationDto) {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountService.findUserByEmail(userDetails.getUsername());

    ApplicationDto application = applicationService.saveApplication(account, newApplicationDto);

    return new ResponseEntity<>(application, HttpStatus.CREATED);
  }
}
