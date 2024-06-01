package net.tamasnovak.domains.role.service;

import net.tamasnovak.domains.role.models.dtoResponses.RoleOptionsDto;
import net.tamasnovak.domains.role.models.entity.Role;

import java.util.List;

public interface RoleService {
  Role getRoleByUuid(String uuid);
  List<RoleOptionsDto> getStudentAndMentorRoleOptions();
}
