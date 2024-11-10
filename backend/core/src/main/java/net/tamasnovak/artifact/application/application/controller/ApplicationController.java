/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.controller;

import java.util.UUID;

import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/applications" endpoint.
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/applications")
@Validated
public class ApplicationController {
  private final ApplicationService applicationService;

  @Autowired
  public ApplicationController(ApplicationService applicationService) {
    this.applicationService = applicationService;
  }

  /**
   * Fetches {@link ApplicationData} for a specified application uuid.
   * The @ValidUuid annotation validates the uuid string.
   *
   * @param uuid The uuid of the application to retrieve.
   * @return A {@link ResponseEntity} containing the `HttpStatus.OK` status code and the created {@link ApplicationData} object.
   */
  @GetMapping(value = "/{uuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationData> fetchApplicationData(@PathVariable("uuid") @ValidUuid final String uuid) {
    final ApplicationData response = applicationService.createApplicationData(UUID.fromString(uuid));

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
