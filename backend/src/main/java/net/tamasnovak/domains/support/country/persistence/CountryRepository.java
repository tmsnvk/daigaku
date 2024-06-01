package net.tamasnovak.domains.support.country.persistence;

import net.tamasnovak.domains.support.country.models.dtoResponses.CountrySelectOptionDto;
import net.tamasnovak.domains.support.country.models.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CountryRepository extends JpaRepository<Country, Long> {
  Optional<Country> findByUuid(UUID uuid);

  List<CountrySelectOptionDto> findAllByOrderByNameAsc();
}
