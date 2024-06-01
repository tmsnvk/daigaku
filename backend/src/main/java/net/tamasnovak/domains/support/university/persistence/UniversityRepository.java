package net.tamasnovak.domains.support.university.persistence;

import net.tamasnovak.domains.support.country.models.entity.Country;
import net.tamasnovak.domains.support.university.models.dtoResponses.UniversitySelectOptionDto;
import net.tamasnovak.domains.support.university.models.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UniversityRepository extends JpaRepository<University, Long> {
  Optional<University> findByUuid(UUID uuid);

  List<UniversitySelectOptionDto> findByCountryOrderByNameAsc(Country country);
}
