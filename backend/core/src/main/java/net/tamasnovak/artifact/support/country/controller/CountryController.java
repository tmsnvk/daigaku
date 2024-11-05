/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/countries")
public class CountryController {
  private final CountryService countryService;

  public CountryController(CountryService countryService) {
    this.countryService = countryService;
  }

  /**
   * Fetches all {@link Country} objects as dropdown options for frontend forms.
   *
   * @return a list of {@link CountrySelectOption}.
   */
  @GetMapping(value = "/options", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<CountrySelectOption>> fetchDropdownOptions() {
    final List<CountrySelectOption> response = countryService.findCountrySelectOptionsSortedByName();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
