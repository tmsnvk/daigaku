/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.interviewstatus.controller;

import java.util.List;

import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.service.InterviewStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/interview-status" endpoint.
 */
@RestController
@RequestMapping(path = "/api/v1/interview-status")
public class InterviewStatusController {
  private final InterviewStatusService interviewStatusService;

  @Autowired
  public InterviewStatusController(InterviewStatusService interviewStatusService) {
    this.interviewStatusService = interviewStatusService;
  }

  /**
   * Fetches all Interview Status as {@link StatusSelectOption} objects to be used on the frontend in various forms.
   *
   * @return A {@link ResponseEntity} containing a {@link HttpStatus#OK} status code and a {@link StatusSelectOption} object.
   */
  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusSelectOption>> fetchSelectOptions() {
    final List<StatusSelectOption> response = interviewStatusService.findAllSortedByName();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
