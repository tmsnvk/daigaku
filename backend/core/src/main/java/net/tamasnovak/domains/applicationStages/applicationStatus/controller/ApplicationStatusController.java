package net.tamasnovak.domains.applicationStages.applicationStatus.controller;

import net.tamasnovak.domains.applicationStages.applicationStatus.service.ApplicationStatusService;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/application-statuses")
public class ApplicationStatusController {
  private final ApplicationStatusService applicationStatusService;

  @Autowired
  public ApplicationStatusController(ApplicationStatusService applicationStatusService) {
    this.applicationStatusService = applicationStatusService;
  }

  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusSelectOption>> getAllSelectOptions() {
    final List<StatusSelectOption> response = applicationStatusService.getAllSelectOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
