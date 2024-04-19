package net.tamasnovak.controllers.finalDestination;

import net.tamasnovak.projections.status.GenericStatusView;
import net.tamasnovak.services.finalDestinationStatus.FinalDestinationStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

  @RequestMapping(
    path = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<GenericStatusView>> getAll() {
    List<GenericStatusView> finalDestinationStatuses = finalDestinationStatusService.findAll();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(finalDestinationStatuses);
  }
}
