package net.tamasnovak.domain.support.country.persistence;

import net.tamasnovak.domain.support.country.dto.CountrySelectOption;
import net.tamasnovak.domain.support.country.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CountryRepository extends JpaRepository<Country, Long> {
  Optional<Country> findByUuid(UUID uuid);

  List<CountrySelectOption> findAllByOrderByNameAsc();
}
