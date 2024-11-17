/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.institution.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.support.institution.dto.InstitutionSelectOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Service interface for managing {@link Institution} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface InstitutionService {
  /**
   * Finds a single {@link Institution} object by the provided uuid.
   *
   * @param institutionUuid The institution's uuid.
   * @return {@link Institution}.
   * @throws EntityNotFoundException If no institution exists with the specified uuid.
   */
  Institution findInstitutionByUuid(UUID institutionUuid);

  /**
   * Finds a single {@link Institution} object by the provided id.
   *
   * @param id The institution's id.
   * @return {@link Institution}.
   * @throws EntityNotFoundException If no institution exists with the specified uuid.
   */
  Institution findInstitutionById(long id);

  /**
   * Finds a list of {@link Institution} objects and returns them as {@link InstitutionSelectOption}.
   *
   * @return A list of {@link InstitutionSelectOption}.
   */
  List<InstitutionSelectOption> findInstitutionsSortedByName();
}
