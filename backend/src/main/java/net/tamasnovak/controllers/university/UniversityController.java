package net.tamasnovak.controllers.university;

import net.tamasnovak.annotations.uuidConstraint.UuidConstraint;
import net.tamasnovak.dtos.university.UniversityOptionView;
import net.tamasnovak.services.university.UniversityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/universities")
@Validated
public class UniversityController {
  private final UniversityService universityService;

  public UniversityController(UniversityService universityService) {
    this.universityService = universityService;
  }

  @GetMapping(value = "/options/{countryUuid}")
  public ResponseEntity<List<UniversityOptionView>> getSelectOptionsByCountry(@PathVariable("countryUuid") @UuidConstraint String countryUuid) {
    List<UniversityOptionView> returnProjection = universityService.getSelectOptionsByCountryUuid(countryUuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjection);
  }
}
