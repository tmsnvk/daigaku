package net.tamasnovak.controllers.offerStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.services.offerStatus.OfferStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/offer-statuses")
public class OfferStatusController {
  private final OfferStatusService offerStatusService;

  @Autowired
  public OfferStatusController(OfferStatusService offerStatusService) {
    this.offerStatusService = offerStatusService;
  }

  @RequestMapping(
    path = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<StatusSelectOptionView>> getSelectOptions() {
    List<StatusSelectOptionView> returnDto = offerStatusService.getSelectOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnDto);
  }
}
