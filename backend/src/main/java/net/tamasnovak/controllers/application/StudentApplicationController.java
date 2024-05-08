package net.tamasnovak.controllers.application;

import jakarta.validation.Valid;
import net.tamasnovak.annotations.uuidValidation.UuidConstraint;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.services.application.studentApplication.StudentApplicationService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/applications/student")
public class StudentApplicationController {
  private final StudentApplicationService studentApplicationService;
  private final AuthenticationFacade authenticationFacade;

  @Autowired
  public StudentApplicationController(StudentApplicationService studentApplicationService, AuthenticationFacade authenticationFacade) {
    this.studentApplicationService = studentApplicationService;
    this.authenticationFacade = authenticationFacade;
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<ApplicationDto>> getAllByAccount() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    List<ApplicationDto> applications = studentApplicationService.findAllByAccount(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(applications);
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.POST,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApplicationDto> create(@Valid @RequestBody NewApplicationByStudentDto newApplicationByStudentDto) {
    Account account = authenticationFacade.getAuthenticatedAccount();

    ApplicationDto newApplication = studentApplicationService.createApplication(account, newApplicationByStudentDto);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(newApplication);
  }

  @RequestMapping(
    value = "/{uuid}",
    method = RequestMethod.PATCH,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApplicationDto> updateByUuid(@PathVariable("uuid") @UuidConstraint String uuid, @Valid @RequestBody UpdateApplicationByStudentDto updateApplicationByStudentDto) {
    UUID accountUuid = authenticationFacade.getAuthenticatedAccount().getUuid();

    ApplicationDto applicationDto = studentApplicationService.updateByUuid(accountUuid, uuid, updateApplicationByStudentDto);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(applicationDto);
  }

  @RequestMapping(
    value = "/markForDeletion/{uuid}",
    method = RequestMethod.PATCH
  )
  public ResponseEntity<HttpStatus> updateMarkedForDeletionStatus(@PathVariable("uuid") @UuidConstraint String uuid) {
    studentApplicationService.markForDeletionByUuid(uuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .build();
  }

  @RequestMapping(
    value = "/dashboard",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<DashboardAggregateDataDto> getDashboardAggregateData() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    DashboardAggregateDataDto dashboardAggregateDataDto = studentApplicationService.getDashboardData(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(dashboardAggregateDataDto);
  }
}
