package net.tamasnovak.artifact.application.application.controller;

import net.tamasnovak.artifact.application.application.service.ApplicationService;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
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

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/applications")
@Validated
public class ApplicationController {
  private final ApplicationService applicationService;

  @Autowired
  public ApplicationController(ApplicationService applicationService) {
    this.applicationService = applicationService;
  }

  @GetMapping(
    value = "/{uuid}",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ApplicationData> fetchApplicationData(@PathVariable("uuid") @ValidUuid final String uuid) {
    final ApplicationData response = applicationService.fetchApplicationDataByUuid(UUID.fromString(uuid));

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
