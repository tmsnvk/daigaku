package net.tamasnovak.controllers.applicationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.services.applicationStatus.ApplicationStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

  @GetMapping(value = "")
  public ResponseEntity<List<StatusSelectOptionView>> getAllSelectOptionViews() {
    List<StatusSelectOptionView> returnProjections = applicationStatusService.getAllSelectOptionViews();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }
}
