/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.role.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.role.dto.RoleDropdownOption;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.role.persistence.RoleOptionViewProjection;
import net.tamasnovak.artifact.role.persistence.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Role} entity-related API operations, implementing {@link RoleService}.
 *
 * @since 0.0.1
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
  @Cacheable(value = "RoleByUuid", key = "{ #root.methodName, #uuid }")
  public Role findRoleByUuid(final UUID uuid) {
    return roleRepository.findRoleByUuid(uuid)
                         .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleDropdownOption", key = "#root.methodName")
  public List<RoleDropdownOption> findStudentAndMentorDropdownOptions() {
    final List<RoleOptionViewProjection> roleProjections = roleRepository.findStudentAndMentorRoleOptions();

    return roleProjections.stream()
                          .map(RoleDropdownOption::new)
                          .collect(Collectors.toList());
  }
}
