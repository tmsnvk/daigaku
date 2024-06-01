package net.tamasnovak.domains.role.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.role.models.dtoResponses.RoleOptionsDto;
import net.tamasnovak.domains.role.models.entity.Role;
import net.tamasnovak.domains.role.persistence.RoleOptionView;
import net.tamasnovak.domains.role.persistence.RoleRepository;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleByName", key = "{ #root.methodName, #uuid }")
  public Role getRoleByUuid(String uuid) {
    return roleRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleOptionDto", key = "#root.methodName")
  public List<RoleOptionsDto> getStudentAndMentorRoleOptions() {
    List<RoleOptionView> roleProjections = roleRepository.getStudentAndMentorRoleOptions();

    return roleProjections.stream()
      .map(RoleOptionsDto::new)
      .collect(Collectors.toList());
  }
}
