package net.tamasnovak.domains.application.studentApplication.controller;

import jakarta.validation.Valid;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.NewApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoRequests.UpdateApplicationByStudentDto;
import net.tamasnovak.domains.application.studentApplication.models.dtoResponses.StudentDashboardDataDto;
import net.tamasnovak.domains.application.studentApplication.service.StudentApplicationService;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import net.tamasnovak.validation.annotations.uuidConstraint.UuidConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<ApplicationDto>> getAllApplications() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    List<ApplicationDto> response = studentApplicationService.getAllApplicationDtosByAccount(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationDto> createApplication(@Valid @RequestBody NewApplicationByStudentDto requestBody) {
    Account account = authenticationFacade.getAuthenticatedAccount();

    ApplicationDto response = studentApplicationService.create(account, requestBody);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(response);
  }

  @PatchMapping(value = "/{uuid}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationDto> patchByUuid(@PathVariable("uuid") @UuidConstraint String uuid,
                                                    @Valid @RequestBody UpdateApplicationByStudentDto requestBody) {
    Account account = authenticationFacade.getAuthenticatedAccount();
    System.out.println(requestBody);
    ApplicationDto response = studentApplicationService.updateAndRetrieveByUuid(uuid, requestBody, account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PatchMapping(value = "/update-is-removable/{uuid}")
  public ResponseEntity<HttpStatus> toggleIsRemovable(@PathVariable("uuid") @UuidConstraint String uuid) {
    studentApplicationService.toggleIsRemovableByApplicationUuid(uuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .build();
  }

  @GetMapping(value = "/dashboard", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<StudentDashboardDataDto> getAggregateData() {
    Account account = authenticationFacade.getAuthenticatedAccount();

    StudentDashboardDataDto response = studentApplicationService.getAggregateDataByAccount(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
