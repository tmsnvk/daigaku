/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.controller;

import java.util.List;

import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.role.dto.RoleSelectOption;
import net.tamasnovak.artifact.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller class managing REST API requests related to "/api/v1/roles" endpoint.
 *
 * @since 0.0.1
 */
@RestController
@RequestMapping(path = "/api/v1/roles")
public class RoleController {
  private final RoleService roleService;

  @Autowired
  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }

  /**
   * Fetches {@link Student} and {@link Mentor} dropdown options for the pending account registration form.
   *
   * @return A {@link ResponseEntity} that contains the {@link HttpStatus#OK} status code and the {@link RoleSelectOption} object.
   */
  @GetMapping(value = "/student-and-mentor", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<RoleSelectOption>> fetchPendingAccountRegistrationFormRoleOptions() {
    final List<RoleSelectOption> response = roleService.findStudentAndMentorSelectOptions();

    return ResponseEntity.status(HttpStatus.OK)
                         .body(response);
  }
}
