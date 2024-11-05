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
 * Service interface for handling database API calls related to the {@link Application} entity.
 *
 * @since 0.0.1
 */
public interface ApplicationService {
  /**
   * Finds an {@link Application} object by its uuid.
   *
   * @param applicationUuid The application's uuid.
   * @return A single {@link Application} object.
   * @throws EntityNotFoundException If no application is found with the provided uuid.
   */
  Application findApplicationByUuid(UUID applicationUuid);

  /**
   * Retrieves an {@link ApplicationData} entity by its uuid.
   *
   * @param applicationUuid The application's uuid.
   * @return A single {@link ApplicationData} object.
   * @throws EntityNotFoundException If no application is found with the provided uuid.
   */
  ApplicationData createApplicationData(UUID applicationUuid);
}
