package net.tamasnovak.artifact.support.institution.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.institution.dto.InstitutionDropdownOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.persistence.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "InstitutionService")
public class InstitutionServiceImpl implements InstitutionService {
  private final InstitutionRepository institutionRepository;
  private final GlobalServiceMessages globalServiceMessages;

  @Autowired
  public InstitutionServiceImpl(InstitutionRepository institutionRepository, GlobalServiceMessages globalServiceMessages) {
    this.institutionRepository = institutionRepository;
    this.globalServiceMessages = globalServiceMessages;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionByUuid", key = "{ #uuid }")
  public Institution findByUuid(final UUID uuid) {
    return institutionRepository.findByUuid(uuid)
                                .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public Institution findById(final long id) {
    return institutionRepository.findInstitutionById(id)
                                .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionDropdownOptions")
  public List<InstitutionDropdownOption> findAllSortedByName() {
    return institutionRepository.findAllByOrderByNameAsc();
  }
}
