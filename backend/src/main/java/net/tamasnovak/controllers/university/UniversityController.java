package net.tamasnovak.controllers.university;

import lombok.RequiredArgsConstructor;
import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.Country;
import net.tamasnovak.exceptions.DbResourceNotFoundException;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/universities")
@RequiredArgsConstructor
public final class UniversityController {
  private final UniversityService universityService;
  private final CountryService countryService;
  private final UniversityControllerMessages universityControllerMessages;

  @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<UniversityOptionDto>> findAll() {
    List<UniversityOptionDto> universityOptions = universityService.findAll();

    return new ResponseEntity<>(universityOptions, HttpStatus.OK);
  }

  @GetMapping(value = "/{countryId}", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<UniversityOptionDto>> findByCountryId(@PathVariable UUID countryId) {
    Country country = countryService.findByUuid(countryId)
      .orElseThrow(() -> new DbResourceNotFoundException(universityControllerMessages.DB_RESOURCE_NOT_FOUND));

    List<UniversityOptionDto> universityOptions = universityService.findByCountryId(country);

    return new ResponseEntity<>(universityOptions, HttpStatus.OK);
  }
}
