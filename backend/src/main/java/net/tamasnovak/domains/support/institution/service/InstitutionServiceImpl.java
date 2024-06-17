package net.tamasnovak.domains.support.institution.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.domains.support.institution.models.dtoResponses.InstitutionOptionDto;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import net.tamasnovak.domains.support.institution.persistence.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
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
  public Institution getByUuid(String uuid) {
    return institutionRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public Institution getById(long id) {
    return institutionRepository.findInstitutionById(id)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionOptions")
  public List<InstitutionOptionDto> getAllSelectOptions() {
    return institutionRepository.findAllByOrderByNameAsc();
  }
}
