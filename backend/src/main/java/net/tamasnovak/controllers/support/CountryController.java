package net.tamasnovak.controllers.support;

import net.tamasnovak.dtos.country.CountrySelectOptionDto;
import net.tamasnovak.services.support.country.CountryService;
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
  public ResponseEntity<List<CountrySelectOptionDto>> getAllSelectOptionsViews() {
    List<CountrySelectOptionDto> returnProjections = countryService.getAllSelectOptionViews();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }
}
