package net.tamasnovak.artifact.role.controller;

import net.tamasnovak.artifact.role.dto.RoleDropdownOption;
import net.tamasnovak.artifact.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/roles")
public class RoleController {
  private final RoleService roleService;

  @Autowired
  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }

  @GetMapping(
    value = "/student-and-mentor",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<RoleDropdownOption>> fetchStudentAndMentorDropdownOptions() {
    final List<RoleDropdownOption> response = roleService.findStudentAndMentorDropdownOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
