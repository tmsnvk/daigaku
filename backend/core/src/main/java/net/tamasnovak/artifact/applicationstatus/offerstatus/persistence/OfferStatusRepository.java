/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.offerstatus.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link OfferStatus} entities.
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface OfferStatusRepository extends JpaRepository<OfferStatus, Long> {
  Optional<OfferStatus> findOfferStatusByUuid(UUID offerStatusUuid);

  Optional<OfferStatus> findOfferStatusByName(String offerStatusName);

  List<StatusSelectOption> findSelectOptionsByOrderByNameAsc();
}
