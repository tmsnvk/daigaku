package net.tamasnovak.controllers.institution;

import net.tamasnovak.dtos.institution.response.InstitutionOptionDto;
import net.tamasnovak.services.institution.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

  @RequestMapping(
    value = "",
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<List<InstitutionOptionDto>> getOptions() {
    List<InstitutionOptionDto> institutionOptions = institutionService.getOptionsSortedAscByName();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(institutionOptions);
  }
}
