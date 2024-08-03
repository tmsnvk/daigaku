package net.tamasnovak.domains.role.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.role.dto.RoleOption;
import net.tamasnovak.domains.role.entity.Role;
import net.tamasnovak.domains.role.persistence.RoleOptionView;
import net.tamasnovak.domains.role.persistence.RoleRepository;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Qualifier(value = "RoleService")
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public RoleServiceImpl(RoleRepository roleRepository, GlobalServiceConstants globalServiceConstants) {
    this.roleRepository = roleRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleByName", key = "{ #root.methodName, #uuid }")
  public Role getByUuid(final String uuid) {
    return roleRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleOptionDto", key = "#root.methodName")
  public List<RoleOption> getStudentAndMentorRoleOptions() {
    final List<RoleOptionView> roleProjections = roleRepository.getStudentAndMentorRoleOptions();

    return roleProjections.stream()
      .map(RoleOption::new)
      .collect(Collectors.toList());
  }
}
