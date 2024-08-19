package net.tamasnovak.artifact.role.service;

import net.tamasnovak.artifact.role.dto.RoleDropdownOption;
import net.tamasnovak.artifact.role.entity.Role;

import java.util.List;
import java.util.UUID;

public interface RoleService {
  Role findByUuid(UUID uuid);

  List<RoleDropdownOption> findStudentAndMentorDropdownOptions();
}
