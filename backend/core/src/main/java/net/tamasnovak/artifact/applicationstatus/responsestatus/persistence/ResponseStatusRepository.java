/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.responsestatus.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link ResponseStatus} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  Optional<ResponseStatus> findResponseStatusByUuid(UUID responseStatusUuid);

  Optional<ResponseStatus> findResponseStatusByName(String responseStatusName);

  List<StatusSelectOption> findSelectOptionsByOrderByNameAsc();
}
