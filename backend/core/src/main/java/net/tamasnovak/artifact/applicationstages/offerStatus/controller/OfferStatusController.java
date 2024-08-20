package net.tamasnovak.artifact.applicationstages.offerStatus.controller;

import net.tamasnovak.artifact.applicationstages.offerStatus.service.OfferStatusService;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/offer-status")
public class OfferStatusController {
  private final OfferStatusService offerStatusService;

  @Autowired
  public OfferStatusController(OfferStatusService offerStatusService) {
    this.offerStatusService = offerStatusService;
  }

  @GetMapping(
    value = "",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StatusDropdownOption>> fetchDropdownOptions() {
    final List<StatusDropdownOption> response = offerStatusService.findAllSortedByName();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
