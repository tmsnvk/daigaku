package net.tamasnovak.services.role;

import net.tamasnovak.entities.role.Role;

public interface RoleCoreService {
  Role getRoleByName(String name);
}
