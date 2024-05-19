package net.tamasnovak.controllers.interviewStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.services.interviewStatus.InterviewStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

  @GetMapping(path = "")
  public ResponseEntity<List<StatusSelectOptionView>> getSelectOptions() {
    List<StatusSelectOptionView> returnProjection = interviewStatusService.getSelectOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjection);
  }
}
