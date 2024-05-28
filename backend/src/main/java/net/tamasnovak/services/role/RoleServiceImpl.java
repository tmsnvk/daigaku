package net.tamasnovak.services.role;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.role.response.MappedRoleOptionView;
import net.tamasnovak.dtos.role.response.RoleOptionView;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.repositories.role.RoleRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;
  private final RoleMapper roleMapper;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper, GlobalServiceConstants globalServiceConstants) {
    this.roleRepository = roleRepository;
    this.roleMapper = roleMapper;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleByName", key = "{ #root.methodName, #name }")
  public Role getRoleByName(String name) {
    return roleRepository.findByNameContains(name)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "RoleOptionDto", key = "#root.methodName")
  public List<MappedRoleOptionView> getStudentAndMentorRoleOptions() {
    List<RoleOptionView> roleOptionProjections = roleRepository.getStudentAndMentorRoleOptions();

    return roleOptionProjections.stream()
      .map(roleMapper::toMappedRoleOptionView)
      .collect(Collectors.toList());
  }
}
