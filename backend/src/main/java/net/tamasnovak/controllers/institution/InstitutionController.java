package net.tamasnovak.controllers.institution;

import net.tamasnovak.dtos.institution.InstitutionOptionView;
import net.tamasnovak.services.institution.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/institutions")
public class InstitutionController {
  private final InstitutionService institutionService;

  @Autowired
  public InstitutionController(InstitutionService institutionService) {
    this.institutionService = institutionService;
  }

  @GetMapping(value = "/options")
  public ResponseEntity<List<InstitutionOptionView>> getSelectOptions() {
    List<InstitutionOptionView> returnProjection = institutionService.getSelectOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjection);
  }
}
