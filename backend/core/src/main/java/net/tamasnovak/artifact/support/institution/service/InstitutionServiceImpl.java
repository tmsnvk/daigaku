/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.institution.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.institution.dto.InstitutionSelectOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.persistence.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link Institution} entity-related API operations, implementing {@link InstitutionService}.
 */
@Service
@Qualifier(value = "InstitutionService")
public class InstitutionServiceImpl implements InstitutionService {
  private final InstitutionRepository institutionRepository;

  @Autowired
  public InstitutionServiceImpl(InstitutionRepository institutionRepository) {
    this.institutionRepository = institutionRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionByUuid", key = "{ #institutionUuid }")
  public Institution findInstitutionByUuid(final UUID institutionUuid) {
    return institutionRepository.findInstitutionByUuid(institutionUuid)
                                .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionDropdownOptions")
  public List<InstitutionSelectOption> findInstitutionsSortedByName() {
    return institutionRepository.findInstitutionsByOrderByNameAsc();
  }
}
