package net.tamasnovak.domains.applicationStages.interviewStatus.controller;

import net.tamasnovak.domains.applicationStages.interviewStatus.service.InterviewStatusService;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<StageSelectOptionDto>> getAllSelectOptions() {
    List<StageSelectOptionDto> response = interviewStatusService.getAllSelectOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
