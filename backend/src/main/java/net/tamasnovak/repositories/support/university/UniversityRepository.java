package net.tamasnovak.repositories.support.university;

import net.tamasnovak.dtos.university.UniversitySelectOptionView;
import net.tamasnovak.entities.support.country.Country;
import net.tamasnovak.entities.support.university.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UniversityRepository extends JpaRepository<University, Long> {
  List<University> findAll();

  List<UniversitySelectOptionView> findByCountryOrderByNameAsc(Country country);

  Optional<University> findByUuid(UUID uuid);
}
