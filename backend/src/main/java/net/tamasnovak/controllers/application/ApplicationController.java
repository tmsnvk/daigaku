package net.tamasnovak.controllers.application;

import net.tamasnovak.dtos.application.ApplicationDto;
import net.tamasnovak.services.application.application.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(path = "/api/applications")
public class ApplicationController {
  private final ApplicationService applicationService;

  @Autowired
  public ApplicationController(ApplicationService applicationService) {
    this.applicationService = applicationService;
  }

  @RequestMapping(
    value = "/{uuid}",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<ApplicationDto> getByUuid(@PathVariable("uuid") UUID uuid) {
    ApplicationDto application = applicationService.getByUuid(uuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(application);
  }
}
