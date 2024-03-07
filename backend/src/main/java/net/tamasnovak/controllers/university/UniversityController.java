package net.tamasnovak.controllers.university;

import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.Country;
import net.tamasnovak.entities.University;
import net.tamasnovak.exceptions.DbResourceNotFoundException;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/universities")
public class UniversityController {
  private final UniversityMapper universityMapper;
  private final UniversityService universityService;
  private final CountryService countryService;
  private final UniversityControllerMessages universityControllerMessages;

  @Autowired
  public UniversityController(UniversityMapper universityMapper, UniversityService universityService, CountryService countryService, UniversityControllerMessages universityControllerMessages) {
    this.universityMapper = universityMapper;
    this.universityService = universityService;
    this.countryService = countryService;
    this.universityControllerMessages = universityControllerMessages;
  }

  @GetMapping(value = "", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<UniversityOptionDto>> findAll() {
    List<University> universities = universityService.findAll();

    // todo - the dto mapping should happen in the service layer.
    List<UniversityOptionDto> universityOptions = universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());

    return new ResponseEntity<>(universityOptions, HttpStatus.OK);
  }

  @GetMapping(value = "/{countryId}", produces = "application/json")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<UniversityOptionDto>> findByCountryId(@PathVariable UUID countryId) {
    Country country = countryService.findByUuid(countryId)
      .orElseThrow(() -> new DbResourceNotFoundException(universityControllerMessages.DB_RESOURCE_NOT_FOUND));

    List<University> universities = universityService.findByCountryId(country);

    List<UniversityOptionDto> universityOptions = universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());

    return new ResponseEntity<>(universityOptions, HttpStatus.OK);
  }
}
