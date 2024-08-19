package net.tamasnovak.artifact.support.university.persistence;

import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.university.dto.UniversityDropdownOption;
import net.tamasnovak.artifact.support.university.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UniversityRepository extends JpaRepository<University, Long> {
  Optional<University> findByUuid(UUID uuid);

  List<UniversityDropdownOption> findByCountryOrderByNameAsc(Country country);
}
