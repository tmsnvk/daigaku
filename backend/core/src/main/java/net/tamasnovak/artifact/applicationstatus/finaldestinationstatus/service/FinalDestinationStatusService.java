/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;

/**
 * Service interface for managing {@link FinalDestinationStatus} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface FinalDestinationStatusService {
  /**
   * Finds a {@link FinalDestinationStatus} object by its uuid.
   *
   * @param statusUuid The ApplicationStatus's uuid.
   * @return {@link FinalDestinationStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  FinalDestinationStatus findStatusByUuid(UUID statusUuid);

  /**
   * Finds a {@link FinalDestinationStatus} object by its name.
   *
   * @param statusName The FinalDestinationStatus's name.
   * @return {@link FinalDestinationStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  FinalDestinationStatus findStatusByName(String statusName);

  /**
   * Finds a list of {@link FinalDestinationStatus} {@link StatusSelectOption} objects.
   *
   * @return A list of {@link StatusSelectOption}.
   */
  List<StatusSelectOption> findSelectOptionsSortedByName();
}
