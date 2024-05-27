package net.tamasnovak.controllers.support;

import net.tamasnovak.annotations.uuidConstraint.UuidConstraint;
import net.tamasnovak.dtos.university.UniversitySelectOptionView;
import net.tamasnovak.services.support.university.UniversityCoreService;
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
  private final UniversityCoreService universityCoreService;

  public UniversityController(UniversityCoreService universityCoreService) {
    this.universityCoreService = universityCoreService;
  }

  @GetMapping(value = "/options/{countryUuid}")
  public ResponseEntity<List<UniversitySelectOptionView>> getSelectOptionViewsByCountry(@PathVariable("countryUuid") @UuidConstraint String countryUuid) {
    List<UniversitySelectOptionView> returnProjections = universityCoreService.getAllSelectOptionViewsByCountryUuid(countryUuid);

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }
}
