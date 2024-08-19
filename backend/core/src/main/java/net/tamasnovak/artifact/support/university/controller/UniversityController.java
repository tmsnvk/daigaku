package net.tamasnovak.artifact.support.university.controller;

import net.tamasnovak.artifact.support.university.dto.UniversityDropdownOption;
import net.tamasnovak.artifact.support.university.service.UniversityService;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/universities")
@Validated
public class UniversityController {
  private final UniversityService universityService;

  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  @GetMapping(
    value = "/options/{countryUuid}",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<UniversityDropdownOption>> fetchDropdownOptionsByCountryUuid(@PathVariable("countryUuid") @ValidUuid final String countryUuid) {
    final List<UniversityDropdownOption> response = universityService.findAllByCountryUuidAndSortedByName(UUID.fromString(countryUuid));

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
