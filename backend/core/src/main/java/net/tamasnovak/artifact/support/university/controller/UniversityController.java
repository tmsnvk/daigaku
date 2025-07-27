/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.university.controller;

import java.util.List;
import java.util.UUID;

import net.tamasnovak.artifact.support.university.dto.UniversitySelectOption;
import net.tamasnovak.artifact.support.university.service.UniversityService;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/universities" endpoint.
 */
@RestController
@RequestMapping(path = "/api/v1/universities")
@Validated
public class UniversityController {
  private final UniversityService universityService;

  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  /**
   * Fetches a list of {@link UniversitySelectOption} objects as select options for frontend forms.
   * The {@link ValidUuid} annotation validates the uuid string.
   *
   * @return A {@link ResponseEntity} containing a {@link HttpStatus#OK} status code and a {@link UniversitySelectOption} object.
   */
  @GetMapping(value = "/options", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<UniversitySelectOption>> getAllAsOptionByCountryUuid(
    @ValidUuid @RequestParam(value = "countryUuid") final String countryUuid) {
    final List<UniversitySelectOption> response = universityService.findUniversitiesByCountryUuid(UUID.fromString(countryUuid));

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
