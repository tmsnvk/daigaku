package net.tamasnovak.services.institution;

import net.tamasnovak.dtos.institution.response.InstitutionOptionDto;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.repositories.institution.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstitutionServiceImpl implements InstitutionService{
  private final InstitutionRepository institutionRepository;
  private final InstitutionMapper institutionMapper;

  @Autowired
  public InstitutionServiceImpl(InstitutionRepository institutionRepository, InstitutionMapper institutionMapper) {
    this.institutionRepository = institutionRepository;
    this.institutionMapper = institutionMapper;
  }

  @Override
  public List<InstitutionOptionDto> getOptionsSortedAscByName() {
    List<Institution> institutions = institutionRepository.findAllByOrderByNameAsc();

    return institutions.stream()
      .map(institutionMapper::toOptionDto)
      .collect(Collectors.toList());
  }
}
