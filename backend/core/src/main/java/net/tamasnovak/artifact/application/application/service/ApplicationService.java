/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.service;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.common.entity.Application;

/**
 * Service interface for managing {@link Application} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface ApplicationService {
  /**
   * Finds an {@link Application} object by its uuid.
   *
   * @param applicationUuid The application's uuid.
   * @return {@link Application}.
   * @throws EntityNotFoundException Thrown if no application is found with the provided uuid.
   */
  Application findApplicationByUuid(UUID applicationUuid);

  /**
   * Retrieves an {@link ApplicationData} object by its uuid.
   *
   * @param applicationUuid The application's uuid.
   * @return {@link ApplicationData}.
   * @throws EntityNotFoundException Thrown if no application is found with the provided uuid.
   */
  ApplicationData createApplicationData(UUID applicationUuid);
}
