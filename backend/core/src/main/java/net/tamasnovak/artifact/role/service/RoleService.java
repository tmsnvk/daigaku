package net.tamasnovak.artifact.role.service;

import net.tamasnovak.artifact.role.dto.RoleOption;
import net.tamasnovak.artifact.role.entity.Role;

import java.util.List;
import java.util.UUID;

public interface RoleService {
  Role getByUuid(UUID uuid);

  List<RoleOption> getStudentAndMentorRoleOptions();
}
