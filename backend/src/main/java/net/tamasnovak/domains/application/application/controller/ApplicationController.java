package net.tamasnovak.domains.application.application.controller;

import net.tamasnovak.domains.application.application.service.ApplicationService;
import net.tamasnovak.domains.application.shared.models.dtoResponses.ApplicationDto;
import net.tamasnovak.validation.annotations.uuidConstraint.UuidConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/applications")
@Validated
public class ApplicationController {
  private final ApplicationService applicationService;

  @Autowired
  public ApplicationController(ApplicationService applicationService) {
    this.applicationService = applicationService;
  }

  @GetMapping(value = "/{uuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationDto> getApplicationDto(@PathVariable("uuid") @UuidConstraint String uuid) {
    ApplicationDto response = applicationService.getApplicationDtoByUuid(uuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }

  @GetMapping(value = "/download")
  public ResponseEntity<HttpStatus> handleDownload() {
    applicationService.handleApplicationDownloadRequest();

    return ResponseEntity
      .status(HttpStatus.OK)
      .build();
  }
}
