package net.tamasnovak.controllers.university;

import jakarta.validation.Valid;
import net.tamasnovak.projections.university.UniversityOptionView;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/universities")
public class UniversityController {
  private final UniversityService universityService;

  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  @RequestMapping(
    value = "/options/{countryUuid}",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<UniversityOptionView>> getOptionsByCountryUuid(@Valid @PathVariable UUID countryUuid) {
    List<UniversityOptionView> universityOptions = universityService.getOptionsByCountryUuidAndSortedAscByName(countryUuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(universityOptions);
  }
}
