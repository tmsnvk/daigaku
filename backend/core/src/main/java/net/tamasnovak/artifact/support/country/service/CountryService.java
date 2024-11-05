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

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.support.country.dto.CountrySelectOption;
import net.tamasnovak.artifact.support.country.entity.Country;

/**
 * Service interface for handling database API calls related to the {@link Country} entity.
 *
 * @since 0.0.1
 */
public interface CountryService {
  /**
   * Finds a single {@link Country} object by the provided uuid.
   *
   * @param countryUuid The country's uuid.
   * @return A single {@link Country} object.
   * @throws EntityNotFoundException If no country exists with the specified uuid.
   */
  Country findCountryByUuid(UUID countryUuid);

  /**
   * Finds a list of {@link CountrySelectOption} objects.
   *
   * @return A list of {@link CountrySelectOption} objects.
   */
  List<CountrySelectOption> findCountrySelectOptionsSortedByName();
}
