/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.offerstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;

/**
 * Service interface for managing {@link OfferStatus} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface OfferStatusService {
  /**
   * Finds a {@link OfferStatus} object by its uuid.
   *
   * @param statusUuid The OfferStatus's uuid.
   * @return {@link OfferStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  OfferStatus findStatusByUuid(UUID statusUuid);

  /**
   * Finds a {@link OfferStatus} object by its name.
   *
   * @param statusName The OfferStatus's name.
   * @return {@link OfferStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  OfferStatus findStatusByName(String statusName);

  /**
   * Finds a list of {@link OfferStatus} {@link StatusSelectOption} objects.
   *
   * @return A list of {@link StatusSelectOption}.
   */
  List<StatusSelectOption> findAllSortedByName();
}
