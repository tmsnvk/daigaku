package net.tamasnovak.utilities.mapper;

import net.tamasnovak.dtos.role.response.MappedRoleOptionView;
import net.tamasnovak.dtos.role.response.RoleOptionView;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
  public MappedRoleOptionView toMappedRoleOptionView(RoleOptionView roleOptionView) {
    return new MappedRoleOptionView(
      roleOptionView.getUuid(),
      roleOptionView.getName()
    );
  }
}
