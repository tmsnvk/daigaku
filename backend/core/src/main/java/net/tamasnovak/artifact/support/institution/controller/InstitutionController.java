/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.institution.controller;

import java.util.List;

import net.tamasnovak.artifact.support.institution.dto.InstitutionSelectOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/institutions" endpoint.
 */
@RestController
@RequestMapping(path = "/api/v1/institutions")
public class InstitutionController {
  private final InstitutionService institutionService;

  @Autowired
  public InstitutionController(InstitutionService institutionService) {
    this.institutionService = institutionService;
  }

  /**
   * Fetches all {@link Institution} objects as select options for frontend forms.
   *
   * @return A {@link ResponseEntity} containing a {@link HttpStatus#OK} status code and a {@link InstitutionSelectOption} object.
   */
  @GetMapping(value = "/options", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<InstitutionSelectOption>> findOptionList() {
    final List<InstitutionSelectOption> response = institutionService.findInstitutionsSortedByName();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
