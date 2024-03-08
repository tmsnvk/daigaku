package net.tamasnovak.services.university;

import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.University;
import org.springframework.stereotype.Component;

@Component
final class UniversityMapper {
  public UniversityOptionDto toOptionDto(University university) {
    return new UniversityOptionDto(
      university.getUuid(),
      university.getName(),
      university.getAbbreviation()
    );
  }
}
