/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.applicationstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;

/**
 * Service interface for managing {@link ApplicationStatus} entity-related API operations.
 */
public interface ApplicationStatusService {
  /**
   * Finds a {@link ApplicationStatus} object by its uuid.
   *
   * @param statusUuid The ApplicationStatus's uuid.
   * @return {@link ApplicationStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  ApplicationStatus findStatusByUuid(UUID statusUuid);

  /**
   * Finds a {@link ApplicationStatus} object by its name.
   *
   * @param statusName The ApplicationStatus's name.
   * @return {@link ApplicationStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  ApplicationStatus findStatusByName(String statusName);

  /**
   * Finds a list of {@link ApplicationStatus} {@link StatusSelectOption} objects.
   *
   * @return A list of {@link StatusSelectOption}.
   */
  List<StatusSelectOption> findSelectOptionsSortedByName();
}
