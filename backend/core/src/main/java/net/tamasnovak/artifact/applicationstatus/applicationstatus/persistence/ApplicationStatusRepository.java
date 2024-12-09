/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.applicationstatus.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link ApplicationStatus} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Long> {
  Optional<ApplicationStatus> findApplicationStatusByUuid(UUID applicationStatusUuid);

  Optional<ApplicationStatus> findApplicationStatusByName(String applicationStatusName);

  List<StatusSelectOption> findSelectOptionsByOrderByNameAsc();
}
