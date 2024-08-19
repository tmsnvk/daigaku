package net.tamasnovak.domain.role.service;

import net.tamasnovak.domain.role.dto.RoleOption;
import net.tamasnovak.domain.role.entity.Role;

import java.util.List;
import java.util.UUID;

public interface RoleService {
  Role getByUuid(UUID uuid);

  List<RoleOption> getStudentAndMentorRoleOptions();
}
