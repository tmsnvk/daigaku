/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.country.service;

import java.util.List;
import java.util.UUID;

import net.tamasnovak.artifact.support.country.dto.CountrySelectOption;
import net.tamasnovak.artifact.support.country.entity.Country;

/**
 * Service interface managing {@link Country} entity-related API calls towards the database.
 *
 * @since 0.0.1
 */
public interface CountryService {
  /**
   * Finds a single {@link Country} object by the provided uuid.
   *
   * @param uuid The country's uuid.
   * @return {@link Country}.
   */
  Country findCountryByUuid(UUID uuid);

  /**
   * Finds a list of {@link CountrySelectOption} objects.
   *
   * @return A list of {@link CountrySelectOption}.
   */
  List<CountrySelectOption> findCountrySelectOptionsSortedByName();
}
