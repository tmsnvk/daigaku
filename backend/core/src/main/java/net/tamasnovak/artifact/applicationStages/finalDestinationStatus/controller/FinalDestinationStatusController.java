package net.tamasnovak.artifact.applicationStages.finalDestinationStatus.controller;

import net.tamasnovak.artifact.applicationStages.finalDestinationStatus.service.FinalDestinationStatusService;
import net.tamasnovak.artifact.applicationStages.shared.dto.StatusDropdownOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/final-destination-statuses")
public class FinalDestinationStatusController {
  private final FinalDestinationStatusService finalDestinationStatusService;

  @Autowired
  public FinalDestinationStatusController(FinalDestinationStatusService finalDestinationStatusService) {
    this.finalDestinationStatusService = finalDestinationStatusService;
  }

  @GetMapping(
    value = "",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusDropdownOption>> fetchDropdownOptions() {
    final List<StatusDropdownOption> response = finalDestinationStatusService.findAllSortedByName();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
