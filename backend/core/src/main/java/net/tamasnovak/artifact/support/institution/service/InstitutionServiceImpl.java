package net.tamasnovak.artifact.support.institution.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
import net.tamasnovak.artifact.support.institution.dto.InstitutionDropdownOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.persistence.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "InstitutionService")
public class InstitutionServiceImpl implements InstitutionService {
  private final InstitutionRepository institutionRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public InstitutionServiceImpl(InstitutionRepository institutionRepository, GlobalServiceConstants globalServiceConstants) {
    this.institutionRepository = institutionRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionByUuid", key = "{ #uuid }")
  public Institution findByUuid(final UUID uuid) {
    return institutionRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public Institution findById(final long id) {
    return institutionRepository.findInstitutionById(id)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionDropdownOptions")
  public List<InstitutionDropdownOption> findAllSortedByName() {
    return institutionRepository.findAllByOrderByNameAsc();
  }
}
