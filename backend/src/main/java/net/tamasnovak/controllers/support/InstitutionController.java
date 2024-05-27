package net.tamasnovak.controllers.support;

import net.tamasnovak.dtos.institution.InstitutionOptionView;
import net.tamasnovak.services.support.institution.InstitutionCoreService;
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
  private final InstitutionCoreService institutionCoreService;

  @Autowired
  public InstitutionController(InstitutionCoreService institutionCoreService) {
    this.institutionCoreService = institutionCoreService;
  }

  @GetMapping(value = "/options")
  public ResponseEntity<List<InstitutionOptionView>> getAllSelectOptionsViews() {
    List<InstitutionOptionView> returnProjections = institutionCoreService.getAllSelectOptionViews();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }
}
