package net.tamasnovak.controllers.responseStatus;

import net.tamasnovak.dtos.responseStatus.ResponseStatusFormDto;
import net.tamasnovak.services.responseStatus.ResponseStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/response-statuses")
public class ResponseStatusController {
  private final ResponseStatusService responseStatusService;

  @Autowired
  public ResponseStatusController(ResponseStatusService responseStatusService) {
    this.responseStatusService = responseStatusService;
  }

  @RequestMapping(
    path = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<ResponseStatusFormDto>> getAll() {
    List<ResponseStatusFormDto> responseStatuses = responseStatusService.findAll();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(responseStatuses);
  }
}
