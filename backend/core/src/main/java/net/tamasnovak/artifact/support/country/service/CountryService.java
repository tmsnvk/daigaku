/**
 * Copyright © [Daigaku].
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
 * Service interface for managing {@link Country} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface CountryService {
  /**
   * Finds a single {@link Country} object by the provided uuid.
   *
   * @param countryUuid The country's uuid.
   * @return {@link Country}.
   * @throws EntityNotFoundException If no country exists with the specified uuid.
   */
  Country findCountryByUuid(UUID countryUuid);

  /**
   * Finds a list of {@link CountrySelectOption} objects.
   *
   * @return A list of {@link CountrySelectOption}.
   */
  List<CountrySelectOption> findCountrySelectOptionsSortedByName();
}
