package net.tamasnovak.controllers.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.dtos.application.DashboardDataDto;
import net.tamasnovak.dtos.application.NewApplicationDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.repositories.ApplicationRepository;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/applications")
public final class ApplicationController {
  private final ApplicationService applicationService;
  private final AccountService accountService;

  public ApplicationController(ApplicationService applicationService, AccountService accountService) {
    this.applicationService = applicationService;
    this.accountService = accountService;
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<ApplicationDto>> findAll() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountService.findUserByEmail(userDetails.getUsername());

    List<ApplicationDto> applications = applicationService.findAll(account);

    return new ResponseEntity<>(applications, HttpStatus.OK);
  }

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

  @RequestMapping(
    value = "/dashboard-data",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<DashboardDataDto> getDashboardData() {
    User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Account account = accountService.findUserByEmail(userDetails.getUsername());

    DashboardDataDto dashboardDataDto = applicationService.getDashboardData(account.getId());

    return new ResponseEntity<>(dashboardDataDto, HttpStatus.OK);
  }
}
