/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.university.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.university.dto.UniversitySelectOption;
import net.tamasnovak.artifact.support.university.entity.University;

/**
 * Service interface for handling database API calls related to the {@link University} entity.
 *
 * @since 0.0.1
 */
public interface UniversityService {
  /**
   * Finds a single {@link University} object by the associated uuid.
   *
   * @param universityUuid The university's uuid.
   * @return A single {@link University} object.
   * @throws EntityNotFoundException If no university exists with the specified uuid.
   */
  University findUniversityByUuid(UUID universityUuid);

  /**
   * Finds a list of {@link University} objects associated with a {@link Country} object's uuid.
   *
   * @param countryUuid The provided country's uuid.
   * @return A list of {@link University} objects.
   */
  List<UniversitySelectOption> findUniversitiesByCountryUuid(UUID countryUuid);
}
