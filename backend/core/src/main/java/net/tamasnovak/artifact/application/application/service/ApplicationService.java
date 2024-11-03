/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.service;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.entity.Application;

/**
 * Service interface managing {@link Application} entity-related API calls towards the database.
 *
 * @since 0.0.1
 */
public interface ApplicationService {
  /**
   * Finds an {@link Application} entity by its uuid.
   *
   * @param uuid The uuid of the {@link Application} to retrieve.
   * @return {@link Application}
   * @throws EntityNotFoundException If no application is found with the provided uuid.
   */
  Application findApplicationByUuid(UUID uuid);

  /**
   * Retrieves an {@link ApplicationData} entity by its uuid.
   *
   * @param uuid The uuid of the application.
   * @return {@link ApplicationData}
   * @throws EntityNotFoundException If no application is found with the provided uuid.
   */
  ApplicationData createApplicationDataByUuid(UUID uuid);
}
