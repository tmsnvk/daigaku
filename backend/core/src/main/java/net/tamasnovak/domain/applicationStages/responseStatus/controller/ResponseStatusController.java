package net.tamasnovak.domain.applicationStages.responseStatus.controller;

import net.tamasnovak.domain.applicationStages.responseStatus.service.ResponseStatusService;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/response-statuses")
public class ResponseStatusController {
  private final ResponseStatusService responseStatusService;

  @Autowired
  public ResponseStatusController(ResponseStatusService responseStatusService) {
    this.responseStatusService = responseStatusService;
  }

  @RequestMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusSelectOption>> getAllSelectOptions() {
    final List<StatusSelectOption> response = responseStatusService.getAllSelectOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
