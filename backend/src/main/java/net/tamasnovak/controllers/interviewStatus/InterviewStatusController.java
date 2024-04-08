package net.tamasnovak.controllers.interviewStatus;

import net.tamasnovak.dtos.interviewStatus.InterviewStatusFormDto;
import net.tamasnovak.services.interviewStatus.InterviewStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/interview-statuses")
public class InterviewStatusController {
  private final InterviewStatusService interviewStatusService;

  @Autowired
  public InterviewStatusController(InterviewStatusService interviewStatusService) {
    this.interviewStatusService = interviewStatusService;
  }

  @RequestMapping(
    path = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<InterviewStatusFormDto>> getAll() {
    List<InterviewStatusFormDto> interviewStatuses = interviewStatusService.findAll();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(interviewStatuses);
  }
}