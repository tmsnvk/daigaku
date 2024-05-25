package net.tamasnovak.services.institution;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.institution.InstitutionOptionView;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.repositories.institution.InstitutionRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class InstitutionServiceImpl implements InstitutionService{
  private final InstitutionRepository institutionRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public InstitutionServiceImpl(InstitutionRepository institutionRepository, GlobalServiceConstants globalServiceConstants) {
    this.institutionRepository = institutionRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionOptionView", key = "{ #root.methodName }" )
  public List<InstitutionOptionView> getAllSelectOptionViews() {
    return institutionRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionByUuid", key = "{ #root.methodName, #uuid }")
  public Institution getInstitutionByUuid(String uuid) {
    return institutionRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
