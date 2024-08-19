package net.tamasnovak.domain.application.studentApplication.controller;

import jakarta.validation.Valid;
import net.tamasnovak.domain.account.account.entity.Account;
import net.tamasnovak.domain.application.shared.dto.ApplicationData;
import net.tamasnovak.domain.application.studentApplication.dto.NewApplicationByStudent;
import net.tamasnovak.domain.application.studentApplication.dto.UpdateApplicationByStudent;
import net.tamasnovak.domain.application.studentApplication.dto.StudentDashboardData;
import net.tamasnovak.domain.application.studentApplication.service.StudentApplicationService;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;
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
import java.util.UUID;

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

  @GetMapping(
    value = "",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<ApplicationData>> getAllApplications() {
    final UUID authAccountUuid = authenticationFacade.getAuthenticatedAccountUuid();
    final List<ApplicationData> response = studentApplicationService.getAllApplicationResponsesByAccountUuid(authAccountUuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(
    value = "",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationData> createApplication(@Valid @RequestBody final NewApplicationByStudent body) {
    final Account account = authenticationFacade.getAuthenticatedAccount();
    final ApplicationData response = studentApplicationService.create(account, body);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(response);
  }

  @PatchMapping(
    value = "/{uuid}",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationData> patchByUuid(@PathVariable("uuid") @ValidUuid final String uuid,
                                                     @Valid @RequestBody final UpdateApplicationByStudent requestBody) {
    final Account account = authenticationFacade.getAuthenticatedAccount();
    final ApplicationData response = studentApplicationService.updateAndRetrieveByUuid(UUID.fromString(uuid), requestBody, account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PatchMapping(
    value = "/update-is-removable/{uuid}")
  public ResponseEntity<HttpStatus> toggleIsRemovable(@PathVariable("uuid") @ValidUuid final String uuid) {
    studentApplicationService.toggleIsRemovableByApplicationUuid(UUID.fromString(uuid));

    return ResponseEntity
      .status(HttpStatus.OK)
      .build();
  }

  @GetMapping(
    value = "/dashboard",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<StudentDashboardData> getAggregateData() {
    final Account account = authenticationFacade.getAuthenticatedAccount();
    final StudentDashboardData response = studentApplicationService.getAggregateDataByAccount(account);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @PostMapping(
    value = "/download")
  public ResponseEntity<HttpStatus> handleDownload() {
    final UUID authAccountUuid = authenticationFacade.getAuthenticatedAccountUuid();
    studentApplicationService.onApplicationDownloadRequest(authAccountUuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .build();
  }
}
