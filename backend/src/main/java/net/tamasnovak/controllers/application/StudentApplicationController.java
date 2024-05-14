package net.tamasnovak.controllers.application;

import jakarta.validation.Valid;
import net.tamasnovak.annotations.uuidConstraint.UuidConstraint;
import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.ApplicationDto;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.services.application.studentApplication.StudentApplicationService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/applications/student")
@Validated
public class StudentApplicationController {
  private final AuthenticationFacade authenticationFacade;
  private final StudentApplicationService studentApplicationService;

  @Autowired
  public StudentApplicationController(AuthenticationFacade authenticationFacade, StudentApplicationService studentApplicationService) {
    this.authenticationFacade = authenticationFacade;
    this.studentApplicationService = studentApplicationService;
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<ApplicationDto>> getAllByStudent() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    List<ApplicationDto> returnDto = studentApplicationService.getAllByStudent(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnDto);
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApplicationDto> create(
    @Valid @RequestBody NewApplicationByStudentDto requestBody
  ) {
    Account account = authenticationFacade.getAuthenticatedAccount();

    ApplicationDto returnDto = studentApplicationService.createApplication(account, requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(returnDto);
  }

  @RequestMapping(
    value = "/{uuid}",
    method = RequestMethod.PATCH,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApplicationDto> updateByUuid(
    @PathVariable("uuid") @UuidConstraint String uuid,
    @Valid @RequestBody UpdateApplicationByStudentDto requestBody
  ) {
    ApplicationDto returnDto = studentApplicationService.updateApplicationByUuid(uuid, requestBody);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnDto);
  }

  @RequestMapping(
    value = "/update-is-removable/{uuid}",
    method = RequestMethod.PATCH
  )
  public ResponseEntity<HttpStatus> updateIsRemovableByUuid(
    @PathVariable("uuid") @UuidConstraint String uuid
  ) {
    studentApplicationService.updateIsRemovableByApplicationUuid(uuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .build();
  }

  @RequestMapping(
    value = "/dashboard",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<DashboardAggregateDataDto> getAggregateData() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    DashboardAggregateDataDto returnDto = studentApplicationService.getAggregateDataByAccount(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnDto);
  }
}
