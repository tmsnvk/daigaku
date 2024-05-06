package net.tamasnovak.controllers.applicationStatus;

import net.tamasnovak.dtos.status.StatusOptionView;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<StatusOptionView>> getDropdownOptions() {
    List<StatusOptionView> applicationStatuses = applicationStatusService.getDropdownOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(applicationStatuses);
  }
}
