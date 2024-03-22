package net.tamasnovak.controllers.country;

import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.services.country.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/countries")
public final class CountryController {
  private final CountryService countryService;

  public CountryController(CountryService countryService) {
    this.countryService = countryService;
  }

  @RequestMapping(
    value = "/options",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<CountryOptionDto>> getOptions() {
    List<CountryOptionDto> countryOptions = countryService.getOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(countryOptions);
  }
}
