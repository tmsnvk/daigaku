package net.tamasnovak.services.support.institution;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.institution.InstitutionOptionView;
import net.tamasnovak.entities.support.institution.Institution;
import net.tamasnovak.repositories.support.institution.InstitutionRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.support.SupportCoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "InstitutionService")
public class InstitutionService implements InstitutionCoreService, SupportCoreService<Institution> {
  private final InstitutionRepository institutionRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public InstitutionService(InstitutionRepository institutionRepository, GlobalServiceConstants globalServiceConstants) {
    this.institutionRepository = institutionRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  /*
   * InstitutionCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionOptionView", key = "{ #root.methodName }" )
  public List<InstitutionOptionView> getAllSelectOptionViews() {
    return institutionRepository.findAllByOrderByNameAsc();
  }

  /*
   * SupportCoreService interface implementations
   */
  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InstitutionByUuid", key = "{ #root.methodName, #uuid }")
  public Institution getByUuid(String uuid) {
    return institutionRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
