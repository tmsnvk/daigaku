package net.tamasnovak.services.institution;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.institution.response.InstitutionOptionDto;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.repositories.institution.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InstitutionServiceImpl implements InstitutionService{
  private final InstitutionRepository institutionRepository;
  private final InstitutionMapper institutionMapper;
  private final InstitutionServiceConstants institutionServiceConstants;

  @Autowired
  public InstitutionServiceImpl(InstitutionRepository institutionRepository, InstitutionMapper institutionMapper, InstitutionServiceConstants institutionServiceConstants) {
    this.institutionRepository = institutionRepository;
    this.institutionMapper = institutionMapper;
    this.institutionServiceConstants = institutionServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<InstitutionOptionDto> getOptionsSortedAscByName() {
    List<Institution> institutions = institutionRepository.findAllByOrderByNameAsc();

    return institutions.stream()
      .map(institutionMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public Institution findByUuid(UUID uuid) {
    return institutionRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(institutionServiceConstants.INSTITUTION_NOT_FOUND));
  }
}
