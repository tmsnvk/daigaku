package net.tamasnovak.repositories;

import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UniversityRepository extends JpaRepository<University, Integer> {
  List<University> findAll();
  List<University> findUniversitiesByCountryId(Country countryId);
}
