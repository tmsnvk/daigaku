package net.tamasnovak.domains.role.service;

import net.tamasnovak.domains.role.dto.RoleOption;
import net.tamasnovak.domains.role.entity.Role;

import java.util.List;

public interface RoleService {
  Role getByUuid(String uuid);

  List<RoleOption> getStudentAndMentorRoleOptions();
}
