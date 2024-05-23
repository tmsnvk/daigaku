package net.tamasnovak.controllers.application;

import jakarta.validation.Valid;
import net.tamasnovak.annotations.uuidConstraint.UuidConstraint;
import net.tamasnovak.dtos.application.request.NewApplicationByStudentDto;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.dtos.application.response.ApplicationView;
import net.tamasnovak.dtos.application.response.DashboardAggregateDataDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.services.application.studentApplication.StudentApplicationService;
import net.tamasnovak.utilities.authenticationFacade.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

  @GetMapping(value = "")
  public ResponseEntity<List<ApplicationView>> getAllApplicationViews() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    List<ApplicationView> returnProjections = studentApplicationService.getAllApplicationViewsByStudent(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }

  @PostMapping(value = "")
  public ResponseEntity<ApplicationView> create(@Valid @RequestBody NewApplicationByStudentDto requestBody) {
    Account account = authenticationFacade.getAuthenticatedAccount();

    ApplicationView returnProjection = studentApplicationService.createApplication(account, requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(returnProjection);
  }

  @PatchMapping(value = "/{uuid}")
  public ResponseEntity<ApplicationView> update(@PathVariable("uuid") @UuidConstraint String uuid,
                                                @Valid @RequestBody UpdateApplicationByStudentDto requestBody) {
    ApplicationView returnProjection = studentApplicationService.updateApplicationByUuid(uuid, requestBody);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjection);
  }

  @PatchMapping(value = "/update-is-removable/{uuid}")
  public ResponseEntity<HttpStatus> toggleIsRemovable(@PathVariable("uuid") @UuidConstraint String uuid) {
    studentApplicationService.toggleIsRemovableByApplicationUuid(uuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .build();
  }

  @GetMapping(value = "/dashboard")
  public ResponseEntity<DashboardAggregateDataDto> getAggregateDataDto() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    DashboardAggregateDataDto returnProjection = studentApplicationService.getAggregateDataDtoByAccount(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjection);
  }
}
