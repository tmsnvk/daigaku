/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.applicationstatus.controller;

import java.util.List;

import net.tamasnovak.artifact.applicationstatus.applicationstatus.service.ApplicationStatusService;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/application-status" endpoint.
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/application-status")
public class ApplicationStatusController {
  private final ApplicationStatusService applicationStatusService;

  @Autowired
  public ApplicationStatusController(ApplicationStatusService applicationStatusService) {
    this.applicationStatusService = applicationStatusService;
  }

  /**
   * Fetches all Application Status as {@link StatusDropdownOption} objects to be used on the frontend in various forms.
   *
   * @return ResponseEntity Contains `HttpStatus.OK` status code and the {@link StatusDropdownOption} object.
   */
  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusDropdownOption>> fetchSelectOptions() {
    final List<StatusDropdownOption> response = applicationStatusService.findSelectOptionsSortedByName();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
