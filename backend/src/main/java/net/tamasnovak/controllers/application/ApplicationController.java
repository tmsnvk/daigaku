package net.tamasnovak.controllers.application;

import net.tamasnovak.annotations.uuidConstraint.UuidConstraint;
import net.tamasnovak.dtos.application.response.applicationView.MappedApplicationView;
import net.tamasnovak.services.application.application.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

  @GetMapping(value = "/{uuid}")
  public ResponseEntity<MappedApplicationView> getApplicationView(@PathVariable("uuid") @UuidConstraint String uuid) {
    MappedApplicationView returnView = applicationService.getMappedApplicationViewByUuid(uuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnView);
  }
}
