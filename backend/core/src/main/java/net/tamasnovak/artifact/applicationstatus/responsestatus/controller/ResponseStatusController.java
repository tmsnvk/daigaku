/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.responsestatus.controller;

import java.util.List;

import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.responsestatus.service.ResponseStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/response-status" endpoint.
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
   * Fetches all Response Status as {@link StatusSelectOption} objects to be used on the frontend in various forms.
   *
   * @return A {@link ResponseEntity} containing a {@link HttpStatus#OK} status code and a {@link StatusSelectOption} object.
   */
  @RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusSelectOption>> findList() {
    final List<StatusSelectOption> response = responseStatusService.findAllSortedByName();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
