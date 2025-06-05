/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.country.controller;

import java.util.List;

import net.tamasnovak.artifact.support.country.dto.CountrySelectOption;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/countries" endpoint.
 */
@RestController
@RequestMapping(path = "/api/v1/countries")
public class CountryController {
  private final CountryService countryService;

  public CountryController(CountryService countryService) {
    this.countryService = countryService;
  }

  /**
   * Fetches all {@link Country} objects as select options for frontend forms.
   *
   * @return A {@link ResponseEntity} containing a {@link HttpStatus#OK} status code and a {@link CountrySelectOption} object.
   */
  @GetMapping(value = "/options", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<CountrySelectOption>> findOptionList() {
    final List<CountrySelectOption> response = countryService.findCountrySelectOptionsSortedByName();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
