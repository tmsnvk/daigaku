package net.tamasnovak.artifact.support.country.controller;

import net.tamasnovak.artifact.support.country.dto.CountryDropdownOption;
import net.tamasnovak.artifact.support.country.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/countries")
public class CountryController {
  private final CountryService countryService;

  public CountryController(CountryService countryService) {
    this.countryService = countryService;
  }

  @GetMapping(
    value = "/options",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<CountryDropdownOption>> fetchDropdownOptions() {
    final List<CountryDropdownOption> response = countryService.findAllSortedByName();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
