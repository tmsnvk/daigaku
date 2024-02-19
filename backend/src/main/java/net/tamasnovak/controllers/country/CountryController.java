package net.tamasnovak.controllers.country;

import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.entities.Country;
import net.tamasnovak.services.country.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/countries")
public class CountryController {
  private final CountryService countryService;

  @Autowired
  public CountryController(CountryService countryService) {
    this.countryService = countryService;
  }

  @GetMapping(value = "", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<CountryOptionDto>> findUser() {
    List<Country> universities = countryService.findAll();

    List<CountryOptionDto> countryOptions = new ArrayList<>();

    universities.forEach((university -> {
      CountryOptionDto countryOptionDto = new CountryOptionDto(
        university.getUuid(),
        university.getName()
      );

      countryOptions.add(countryOptionDto);
    }));

    return new ResponseEntity<>(countryOptions, HttpStatus.OK);
  }
}
