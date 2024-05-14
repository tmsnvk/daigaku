package net.tamasnovak.services.role;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.repositories.role.RoleRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public RoleServiceImpl(RoleRepository roleRepository, GlobalServiceConstants globalServiceConstants) {
    this.roleRepository = roleRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  public Role getRoleByName(
    String name
  ) {
    return roleRepository.findByNameContains(name)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
