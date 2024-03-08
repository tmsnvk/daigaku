package net.tamasnovak.controllers.country;

import lombok.RequiredArgsConstructor;
import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.services.country.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/countries")
@RequiredArgsConstructor
public final class CountryController {
  private final CountryService countryService;

  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<CountryOptionDto>> findUser() {
    List<CountryOptionDto> countryOptions = countryService.findAll();

    return new ResponseEntity<>(countryOptions, HttpStatus.OK);
  }
}
