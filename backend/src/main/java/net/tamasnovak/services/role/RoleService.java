package net.tamasnovak.services.role;

import net.tamasnovak.dtos.role.response.MappedRoleOptionView;
import net.tamasnovak.entities.role.Role;

import java.util.List;

public interface RoleService {
  Role getRoleByName(String name);
  List<MappedRoleOptionView> getStudentAndMentorRoleOptions();
}
