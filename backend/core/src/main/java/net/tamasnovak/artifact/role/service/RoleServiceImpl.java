/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.role.dto.RoleSelectOption;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.role.persistence.RoleOptionView;
import net.tamasnovak.artifact.role.persistence.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Role} entity-related operations, implementing {@link RoleService}.
 */
@Service
@Qualifier(value = "RoleService")
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;

  @Autowired
  public RoleServiceImpl(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleByUuid", key = "{ #root.methodName, #roleUuid }")
  public Role findRoleByUuid(final UUID roleUuid) {
    return roleRepository.findRoleByUuid(roleUuid)
                         .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleDropdownOption", key = "#root.methodName")
  public List<RoleSelectOption> findStudentAndMentorSelectOptions() {
    final List<RoleOptionView> roleProjections = roleRepository.findStudentAndMentorRoleOptions();

    return roleProjections.stream()
                          .map(RoleSelectOption::new)
                          .collect(Collectors.toList());
  }
}
