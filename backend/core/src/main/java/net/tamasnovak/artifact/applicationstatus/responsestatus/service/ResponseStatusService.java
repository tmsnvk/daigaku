/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.responsestatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;

/**
 * Service interface for managing {@link ResponseStatus} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface ResponseStatusService {
  /**
   * Finds a {@link ResponseStatus} object by its uuid.
   *
   * @param statusUuid The ResponseStatus's uuid.
   * @return {@link ResponseStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  ResponseStatus findStatusByUuid(UUID statusUuid);

  /**
   * Finds a {@link ResponseStatus} object by its name.
   *
   * @param statusName The ResponseStatus's name.
   * @return {@link ResponseStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  ResponseStatus findStatusByName(String statusName);

  /**
   * Finds a list of {@link ResponseStatus} {@link StatusSelectOption} objects.
   *
   * @return A list of {@link StatusSelectOption}.
   */
  List<StatusSelectOption> findAllSortedByName();
}