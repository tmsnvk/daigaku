package net.tamasnovak.domain.role.controller;

import net.tamasnovak.domain.role.dto.RoleOption;
import net.tamasnovak.domain.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/roles")
public class RoleController {
  private final RoleService roleService;

  @Autowired
  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }

  @GetMapping(
    value = "/student-and-mentor",
    produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<RoleOption>> getStudentAndMentorRoleSelectOptions() {
    final List<RoleOption> response = roleService.getStudentAndMentorRoleOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(response);
  }
}
