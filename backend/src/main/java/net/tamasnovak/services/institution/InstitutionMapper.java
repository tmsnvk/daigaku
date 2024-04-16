package net.tamasnovak.services.institution;

import net.tamasnovak.dtos.institution.response.InstitutionOptionDto;
import net.tamasnovak.entities.institution.Institution;
import org.springframework.stereotype.Component;

@Component
public final class InstitutionMapper {
  public InstitutionOptionDto toOptionDto(Institution institution) {
    return new InstitutionOptionDto(
      institution.getUuid(),
      institution.getAddress().getCity(),
      institution.getName()
    );
  }
}
