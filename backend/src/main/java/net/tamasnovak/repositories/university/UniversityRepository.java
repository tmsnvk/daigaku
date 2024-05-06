package net.tamasnovak.repositories.university;

import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.dtos.university.UniversityOptionView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UniversityRepository extends JpaRepository<University, Long> {
  List<University> findAll();
  List<UniversityOptionView> findByCountryOrderByNameAsc(Country country);
  Optional<University> findByUuid(UUID uuid);
}
