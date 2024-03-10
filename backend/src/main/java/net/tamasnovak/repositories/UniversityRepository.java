package net.tamasnovak.repositories;

import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UniversityRepository extends JpaRepository<University, Long> {
  List<University> findAll();
  List<University> findUniversitiesByCountryId(Country country);
  Optional<University> findByUuid(UUID universityId);
}
