package net.tamasnovak.repositories.support.country;

import net.tamasnovak.dtos.country.CountrySelectOptionView;
import net.tamasnovak.entities.support.country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CountryRepository extends JpaRepository<Country, Long> {
  List<CountrySelectOptionView> findAllByOrderByNameAsc();

  Optional<Country> findByUuid(UUID uuid);
}
