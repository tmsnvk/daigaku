/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.offerstatus.service;

import java.util.List;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;

/**
 * Service interface managing {@link OfferStatus} entity-related API calls towards the database.
 *
 * @since 0.0.1
 */
public interface OfferStatusService {
  OfferStatus findByUuid(UUID uuid);

  OfferStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
