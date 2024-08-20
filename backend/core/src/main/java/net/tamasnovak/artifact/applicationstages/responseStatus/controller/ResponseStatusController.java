package net.tamasnovak.artifact.applicationstages.responseStatus.controller;

import net.tamasnovak.artifact.applicationstages.responseStatus.service.ResponseStatusService;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/response-status")
public class ResponseStatusController {
  private final ResponseStatusService responseStatusService;

  @Autowired
  public ResponseStatusController(ResponseStatusService responseStatusService) {
    this.responseStatusService = responseStatusService;
  }

  @RequestMapping(
    value = "",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusDropdownOption>> fetchDropdownOptions() {
    final List<StatusDropdownOption> response = responseStatusService.findAllSortedByName();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
