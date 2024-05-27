package net.tamasnovak.controllers.support;

import net.tamasnovak.dtos.country.CountrySelectOptionView;
import net.tamasnovak.services.support.country.CountryCoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/countries")
public class CountryController {
  private final CountryCoreService countryCoreService;

  public CountryController(CountryCoreService countryCoreService) {
    this.countryCoreService = countryCoreService;
  }

  @GetMapping(value = "/options")
  public ResponseEntity<List<CountrySelectOptionView>> getAllSelectOptionsViews() {
    List<CountrySelectOptionView> returnProjections = countryCoreService.getAllSelectOptionViews();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }
}
