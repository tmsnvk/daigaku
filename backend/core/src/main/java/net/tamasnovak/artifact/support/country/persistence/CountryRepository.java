/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.country.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.support.country.dto.CountrySelectOption;
import net.tamasnovak.artifact.support.country.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link Country} entities.
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface CountryRepository extends JpaRepository<Country, Long> {
  Optional<Country> findCountryByUuid(UUID countryUuid);

  List<CountrySelectOption> findCountriesByOrderByNameAsc();
}
