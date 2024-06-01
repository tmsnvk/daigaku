package net.tamasnovak.domains.support.university.controller;

import net.tamasnovak.domains.support.university.models.dtoResponses.UniversitySelectOptionDto;
import net.tamasnovak.domains.support.university.service.UniversityService;
import net.tamasnovak.validation.annotations.uuidConstraint.UuidConstraint;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/universities")
@Validated
public class UniversityController {
  private final UniversityService universityService;

  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  @GetMapping(value = "/options/{countryUuid}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<UniversitySelectOptionDto>> getSelectOptionsByCountry(@PathVariable("countryUuid") @UuidConstraint String countryUuid) {
    List<UniversitySelectOptionDto> response = universityService.getAllSelectOptionsByCountryUuid(countryUuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
