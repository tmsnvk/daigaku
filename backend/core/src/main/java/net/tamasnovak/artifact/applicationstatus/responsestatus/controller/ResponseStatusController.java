/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.responsestatus.controller;

import java.util.List;

import net.tamasnovak.artifact.applicationstatus.responsestatus.service.ResponseStatusService;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/response-status" endpoint.
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/response-status")
public class ResponseStatusController {
  private final ResponseStatusService responseStatusService;

  @Autowired
  public ResponseStatusController(ResponseStatusService responseStatusService) {
    this.responseStatusService = responseStatusService;
  }

  /**
   * Fetches all Response Status as {@link StatusDropdownOption} objects to be used on the frontend in various forms.
   *
   * @return ResponseEntity Contains `HttpStatus.OK` status code and the {@link StatusDropdownOption} object.
   */
  @RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusDropdownOption>> fetchSelectOptions() {
    final List<StatusDropdownOption> response = responseStatusService.findAllSortedByName();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
