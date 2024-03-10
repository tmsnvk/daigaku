package net.tamasnovak.repositories;

import net.tamasnovak.entities.country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CountryRepository extends JpaRepository<Country, Long> {
  List<Country> findAll();
  Optional<Country> findByUuid(UUID countryId);
}
