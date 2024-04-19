package net.tamasnovak.repositories.country;

import net.tamasnovak.entities.country.Country;
import net.tamasnovak.projections.option.GenericOptionView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CountryRepository extends JpaRepository<Country, Long> {
  List<GenericOptionView> findAllByOrderByNameAsc();
  Optional<Country> findByUuid(UUID countryUuid);
}
