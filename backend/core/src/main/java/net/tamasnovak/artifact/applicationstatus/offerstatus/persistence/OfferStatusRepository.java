/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.offerstatus.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link OfferStatus} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface OfferStatusRepository extends JpaRepository<OfferStatus, Long> {
  Optional<OfferStatus> findOfferStatusByUuid(UUID offerStatusUuid);

  Optional<OfferStatus> findOfferStatusByName(String offerStatusName);

  List<StatusDropdownOption> findSelectOptionsByOrderByNameAsc();
}
