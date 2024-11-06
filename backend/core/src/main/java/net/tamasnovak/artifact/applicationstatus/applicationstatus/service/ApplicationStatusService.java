/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.applicationstatus.service;

import java.util.List;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;

/**
 * Service interface managing {@link ApplicationStatus} entity-related API calls towards the database.
 *
 * @since 0.0.1
 */
public interface ApplicationStatusService {
  /**
   * Finds a single {@link ApplicationStatus} object by its uuid.
   *
   * @param applicationStatusUuid The Application Status's uuid.
   * @return {@link ApplicationStatus}
   */
  ApplicationStatus findApplicationStatusByUuid(UUID applicationStatusUuid);

  /**
   * Finds a single {@link ApplicationStatus} object by its name.
   *
   * @param applicationStatusName The Application Status's name.
   * @return {@link ApplicationStatus}
   */
  ApplicationStatus findApplicationStatusByName(String applicationStatusName);

  /**
   * Finds a list of {@link ApplicationStatus} {@link StatusDropdownOption} objects.
   *
   * @return A list of {@link ApplicationStatus} {@link StatusDropdownOption} objects.
   */
  List<StatusDropdownOption> findSelectOptionsSortedByName();
}
