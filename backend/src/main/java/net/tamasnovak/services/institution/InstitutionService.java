package net.tamasnovak.services.institution;

import net.tamasnovak.dtos.institution.response.InstitutionOptionDto;

import java.util.List;

public interface InstitutionService {
  List<InstitutionOptionDto> getOptionsSortedAscByName();
}
