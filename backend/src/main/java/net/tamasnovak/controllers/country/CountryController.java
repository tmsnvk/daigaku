package net.tamasnovak.controllers.country;

import net.tamasnovak.dtos.country.CountryOptionDto;
import net.tamasnovak.services.country.CountryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/countries")
public final class CountryController {
  private final CountryServiceImpl countryServiceImpl;

  public CountryController(CountryServiceImpl countryServiceImpl) {
    this.countryServiceImpl = countryServiceImpl;
  }

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<CountryOptionDto>> findUser() {
    List<CountryOptionDto> countryOptions = countryServiceImpl.findAll();

    return new ResponseEntity<>(countryOptions, HttpStatus.OK);
  }
}
