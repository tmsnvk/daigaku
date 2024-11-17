/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface CountryRepository extends JpaRepository<Country, Long> {
  Optional<Country> findCountryByUuid(UUID countryUuid);

  List<CountrySelectOption> findCountriesByOrderByNameAsc();
}
