package net.tamasnovak.controllers.country;

import net.tamasnovak.dtos.country.CountrySelectOptionView;
import net.tamasnovak.services.country.CountryService;
import org.springframework.http.HttpStatus;
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

  @GetMapping(value = "/options")
  public ResponseEntity<List<CountrySelectOptionView>> getAllSelectOptionsViews() {
    List<CountrySelectOptionView> returnProjections = countryService.getAllSelectOptionViews();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }
}
