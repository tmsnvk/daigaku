package net.tamasnovak.services.role;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.repositories.role.RoleRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleService implements RoleCoreService {
  private final RoleRepository roleRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public RoleService(RoleRepository roleRepository, GlobalServiceConstants globalServiceConstants) {
    this.roleRepository = roleRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleByName", key = "{ #root.methodName, #name }")
  public Role getRoleByName(String name) {
    return roleRepository.findByNameContains(name)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
