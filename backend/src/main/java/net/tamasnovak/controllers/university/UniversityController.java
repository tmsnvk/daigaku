package net.tamasnovak.controllers.university;

import lombok.RequiredArgsConstructor;
import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/universities")
@RequiredArgsConstructor
public final class UniversityController {
  private final UniversityService universityService;

  @RequestMapping(
    value = "",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<UniversityOptionDto>> findAll() {
    List<UniversityOptionDto> universityOptions = universityService.findAll();

    return new ResponseEntity<>(universityOptions, HttpStatus.OK);
  }

  @RequestMapping(
    value = "/{countryUuid}",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<List<UniversityOptionDto>> findByCountryId(@PathVariable UUID countryUuid) {
    List<UniversityOptionDto> universityOptions = universityService.findByCountryId(countryUuid);

    return new ResponseEntity<>(universityOptions, HttpStatus.OK);
  }
}
