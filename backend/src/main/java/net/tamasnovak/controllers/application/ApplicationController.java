package net.tamasnovak.controllers.application;

import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewSubmittedApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.services.account.account.AccountServiceImpl;
import net.tamasnovak.services.application.ApplicationService;
import net.tamasnovak.utilities.StringFormatterUtilities;
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

import java.util.List;

@RestController
@RequestMapping(path = "/api/applications")
public final class ApplicationController {
  private final ApplicationService applicationService;
  private final AccountServiceImpl accountServiceImpl;
  private final StringFormatterUtilities stringFormatter;

  public ApplicationController(ApplicationService applicationService, AccountServiceImpl accountServiceImpl, StringFormatterUtilities stringFormatter) {
    this.applicationService = applicationService;
    this.accountServiceImpl = accountServiceImpl;
    this.stringFormatter = stringFormatter;
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<NewApplicationDto>> findAll() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountServiceImpl.findUserByEmail(userDetails.getUsername());

    List<NewApplicationDto> applications = applicationService.findAll(account);

    return new ResponseEntity<>(applications, HttpStatus.OK);
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.POST,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<NewApplicationDto> saveApplication(@RequestBody NewSubmittedApplicationDto newSubmittedApplicationDto) {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountServiceImpl.findUserByEmail(userDetails.getUsername());

    NewApplicationDto newApplication = applicationService.saveApplication(account, newSubmittedApplicationDto);

    return new ResponseEntity<>(newApplication, HttpStatus.CREATED);
  }

  @RequestMapping(
    value = "/dashboard-data",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<DashboardDataDto> getDashboardData() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountServiceImpl.findUserByEmail(userDetails.getUsername());
    String accountRole = stringFormatter.transformRolesArrayToString(userDetails);

    DashboardDataDto dashboardDataDto = applicationService.getDashboardData(account.getId(), accountRole);

    return new ResponseEntity<>(dashboardDataDto, HttpStatus.OK);
  }
}
