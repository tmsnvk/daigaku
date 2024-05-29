package net.tamasnovak.controllers.role;

import net.tamasnovak.dtos.role.response.MappedRoleOptionView;
import net.tamasnovak.services.role.RoleService;
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

  @GetMapping(value = "/student-and-mentor", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<MappedRoleOptionView>> getStudentAndMentorRoleSelectOptions() {
    List<MappedRoleOptionView> returnProjections = roleService.getStudentAndMentorRoleOptions();

    return ResponseEntity
      .status(HttpStatus.OK)
      .body(returnProjections);
  }
}
