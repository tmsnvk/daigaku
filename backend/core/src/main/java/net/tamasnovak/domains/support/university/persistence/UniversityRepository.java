package net.tamasnovak.domains.support.university.persistence;

import net.tamasnovak.domains.support.country.entity.Country;
import net.tamasnovak.domains.support.university.dto.UniversitySelectOption;
import net.tamasnovak.domains.support.university.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UniversityRepository extends JpaRepository<University, Long> {
  Optional<University> findByUuid(UUID uuid);

  List<UniversitySelectOption> findByCountryOrderByNameAsc(Country country);
}
