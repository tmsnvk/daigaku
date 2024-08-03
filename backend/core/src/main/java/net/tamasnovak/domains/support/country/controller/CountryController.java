package net.tamasnovak.domains.support.country.controller;

import net.tamasnovak.domains.support.country.dto.CountrySelectOption;
import net.tamasnovak.domains.support.country.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/countries")
public class CountryController {
  private final CountryService countryService;

  public CountryController(CountryService countryService) {
    this.countryService = countryService;
  }

  @GetMapping(value = "/options", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<CountrySelectOption>> getAllSelectOptions() {
    final List<CountrySelectOption> response = countryService.getAllSelectOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
