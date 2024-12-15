/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link FinalDestinationStatus} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface FinalDestinationStatusRepository extends JpaRepository<FinalDestinationStatus, Long> {
  Optional<FinalDestinationStatus> findFinalDestinationStatusByUuid(UUID finalDestinationStatusUuid);

  Optional<FinalDestinationStatus> findFinalDestinationStatusByName(String finalDestinationStatusName);

  List<StatusSelectOption> findSelectOptionsByOrderByNameAsc();
}
