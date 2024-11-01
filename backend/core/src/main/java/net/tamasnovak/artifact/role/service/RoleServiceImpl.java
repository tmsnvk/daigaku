package net.tamasnovak.artifact.role.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceConstants;
import net.tamasnovak.artifact.role.dto.RoleDropdownOption;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.role.persistence.RoleOptionView;
import net.tamasnovak.artifact.role.persistence.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  @Cacheable(value = "RoleByUuid", key = "{ #root.methodName, #uuid }")
  public Role findByUuid(final UUID uuid) {
    return roleRepository.findByUuid(uuid)
                         .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleDropdownOption", key = "#root.methodName")
  public List<RoleDropdownOption> findStudentAndMentorDropdownOptions() {
    final List<RoleOptionView> roleProjections = roleRepository.getStudentAndMentorRoleOptions();

    return roleProjections.stream()
                          .map(RoleDropdownOption::new)
                          .collect(Collectors.toList());
  }
}
