/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.controller;

import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.studentapplication.dto.CreateApplicationByStudentPayload;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudentPayload;
import net.tamasnovak.artifact.application.studentapplication.service.StudentApplicationService;
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

/**
 * Controller class managing REST API requests related to "/api/v1/applications/student/~" endpoint.
 */
@RestController
@RequestMapping(path = "/api/v1/applications/student")
@Validated
public class StudentApplicationController {
  private final AuthenticationFacade authenticationFacade;
  private final StudentApplicationService studentApplicationService;

  @Autowired
  public StudentApplicationController(AuthenticationFacade authenticationFacade, StudentApplicationService studentApplicationService) {
    this.authenticationFacade = authenticationFacade;
    this.studentApplicationService = studentApplicationService;
  }

  /**
   * Fetches a list of {@link ApplicationData} objects associated with the authenticated user.
   *
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code and the {@link ApplicationData} object.
   */
  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<ApplicationData>> getAll() {
    final UUID authAccountUuid = authenticationFacade.retrieveAuthAccountUuid();
    final List<ApplicationData> response = studentApplicationService.findApplicationDataByAccountUuid(authAccountUuid);

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }

  /**
   * Creates an {@link Application} object in the database.
   * The {@link Valid} annotation validates the {@link CreateApplicationByStudentPayload} object as per its validation criteria.
   *
   * @param requestBody The application creation request body.
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code and the {@link ApplicationData} object.
   */
  @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationData> create(@RequestBody @Valid final CreateApplicationByStudentPayload requestBody) {
    final Account account = authenticationFacade.getAuthenticatedAccount();
    final ApplicationData response = studentApplicationService.createApplication(account, requestBody);

    return ResponseEntity.status(HttpStatus.CREATED)
                         .body(response);
  }

  /**
   * Updates the {@link Application} object in the database that is associated with the provided uuid.
   * The {@link Valid} annotation validates the {@link UpdateApplicationByStudentPayload} object as per its validation criteria.
   *
   * @param uuid The to-be-updated application's uuid.
   * @param requestBody The application update request body.
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code and the {@link ApplicationData} object.
   */
  @PatchMapping(value = "/{uuid}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationData> updateByUuid(
    @PathVariable("uuid") @ValidUuid final String uuid, @RequestBody @Valid final UpdateApplicationByStudentPayload requestBody) {
    final Account account = authenticationFacade.getAuthenticatedAccount();
    final ApplicationData response = studentApplicationService.updateApplicationAndFetchByUuid(UUID.fromString(uuid), requestBody, account);

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }

  /**
   * Toggles an {@link Application}'s is_removable field.
   * The {@link Valid} annotation validates the uuid string.
   *
   * @param uuid The application's uuid.
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code.
   */
  @PatchMapping(value = "/{uuid}/soft-delete")
  public ResponseEntity<HttpStatus> toggleSoftDelete(@PathVariable("uuid") @ValidUuid final String uuid) {
    UUID accountUuid = authenticationFacade.retrieveAuthAccountUuid();
    studentApplicationService.toggleIsRemovableByApplicationUuid(UUID.fromString(uuid), accountUuid);

    return ResponseEntity.status(HttpStatus.OK)
                         .build();
  }

  /**
   * Initiates the authenticated user's request to download their submitted {@link Application} objects in .pdf format.
   *
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code.
   */
  @PostMapping(value = "/download/applications")
  public ResponseEntity<HttpStatus> downloadApplicationsAsPdf() {
    final UUID authAccountUuid = authenticationFacade.retrieveAuthAccountUuid();
    studentApplicationService.initiateApplicationPdfDownloadRequest(authAccountUuid);

    return ResponseEntity.status(HttpStatus.OK)
                         .build();
  }
}
