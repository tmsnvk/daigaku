package net.tamasnovak.controllers.application;

import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewSubmittedApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.services.application.ApplicationService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
  private final AuthenticationFacade authenticationFacade;

  @Autowired
  public ApplicationController(ApplicationService applicationService, AuthenticationFacade authenticationFacade) {
    this.applicationService = applicationService;
    this.authenticationFacade = authenticationFacade;
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<NewApplicationDto>> findAll() {
    Account account = authenticationFacade.getAuthenticatedAccount();

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
    Account account = authenticationFacade.getAuthenticatedAccount();

    NewApplicationDto newApplication = applicationService.saveNewApplicationByStudent(account, newSubmittedApplicationDto);

    return new ResponseEntity<>(newApplication, HttpStatus.CREATED);
  }

  @RequestMapping(
    value = "/dashboard-data",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<DashboardDataDto> getDashboardData() {
    Account account = authenticationFacade.getAuthenticatedAccount();
    String accountRole = authenticationFacade.getAuthenticatedAccountRole();

    DashboardDataDto dashboardDataDto = applicationService.getDashboardData(account.getId(), accountRole);

    return new ResponseEntity<>(dashboardDataDto, HttpStatus.OK);
  }
}
