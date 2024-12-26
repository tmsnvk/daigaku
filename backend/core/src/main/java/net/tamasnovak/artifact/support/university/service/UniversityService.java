/**
 * Copyright © [Daigaku].
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
 * Service interface for managing {@link University} entity-related API operations.
 */
public interface UniversityService {
  /**
   * Finds a single {@link University} object by the associated uuid.
   *
   * @param universityUuid The university's uuid.
   * @return {@link University}.
   * @throws EntityNotFoundException If no university exists with the specified uuid.
   */
  University findUniversityByUuid(UUID universityUuid);

  /**
   * Finds a list of {@link University} objects associated with a {@link Country} object's uuid.
   *
   * @param countryUuid The provided country's uuid.
   * @return A list of {@link University}.
   */
  List<UniversitySelectOption> findUniversitiesByCountryUuid(UUID countryUuid);
}
