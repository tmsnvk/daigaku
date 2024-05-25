package net.tamasnovak.controllers.finalDestinationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.services.finalDestinationStatus.FinalDestinationStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

  @GetMapping(path = "")
  public ResponseEntity<List<StatusSelectOptionView>> getAllSelectOptionsViews() {
    List<StatusSelectOptionView> returnViews = finalDestinationStatusService.getAllSelectOptionViews();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnViews);
  }
}
