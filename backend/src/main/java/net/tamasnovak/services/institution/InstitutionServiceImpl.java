package net.tamasnovak.services.institution;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.projections.institution.InstitutionOptionView;
import net.tamasnovak.repositories.institution.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class InstitutionServiceImpl implements InstitutionService{
  private final InstitutionRepository institutionRepository;
  private final InstitutionConstants institutionConstants;

  @Autowired
  public InstitutionServiceImpl(InstitutionRepository institutionRepository, InstitutionConstants institutionConstants) {
    this.institutionRepository = institutionRepository;
    this.institutionConstants = institutionConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<InstitutionOptionView> getOptionsSortedAscByName() {
    return institutionRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public Institution findByUuid(UUID uuid) {
    return institutionRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(institutionConstants.INSTITUTION_NOT_FOUND));
  }
}
