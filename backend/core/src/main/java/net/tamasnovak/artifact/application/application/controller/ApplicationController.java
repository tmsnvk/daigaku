/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.controller;

import java.util.Objects;
import java.util.UUID;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardDetails;
import net.tamasnovak.artifact.application.studentapplication.service.StudentApplicationService;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/applications/~" endpoint.
 */
@RestController
@RequestMapping(path = "/api/v1/applications")
@Validated
public class ApplicationController {
  private final AuthenticationFacade authenticationFacade;
  private final ApplicationService applicationService;
  private final StudentApplicationService studentApplicationService;

  @Autowired
  public ApplicationController(
    AuthenticationFacade authenticationFacade, ApplicationService applicationService,
    StudentApplicationService studentApplicationService) {
    this.authenticationFacade = authenticationFacade;
    this.applicationService = applicationService;
    this.studentApplicationService = studentApplicationService;
  }

  /**
   * Fetches {@link ApplicationData} for a specified application uuid.
   * The {@link ValidUuid} annotation validates the uuid string.
   *
   * @param uuid The uuid of the application to retrieve.
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code and the {@link ApplicationData} object.
   */
  @GetMapping(value = "/{uuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationData> findByUuid(@PathVariable("uuid") @ValidUuid final String uuid) {
    final ApplicationData response = applicationService.createApplicationData(UUID.fromString(uuid));

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }

  /**
   * Fetches the authenticated {@link Student} account's {@link StudentDashboardDetails} object.
   *
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code and a {@link StudentDashboardDetails} object.
   */
  @GetMapping(value = "/statistics/dashboard", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<StudentDashboardDetails> fetchDashboardStatistics(@RequestParam(value = "role") String role) {
    final Account account = authenticationFacade.getAuthenticatedAccount();
    StudentDashboardDetails response;

    if (Objects.equals(role, "student")) {
      response = studentApplicationService.findStudentDashboardDataByAccount(account);
    } else {
      return null;
    }

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
