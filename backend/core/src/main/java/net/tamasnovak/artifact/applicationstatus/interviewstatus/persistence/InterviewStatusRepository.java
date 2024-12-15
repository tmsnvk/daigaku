/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.interviewstatus.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.entity.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link InterviewStatus} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface InterviewStatusRepository extends JpaRepository<InterviewStatus, Long> {
  Optional<InterviewStatus> findInterviewStatusByUuid(UUID interviewStatusUuid);

  Optional<InterviewStatus> findInterviewStatusByName(String interviewStatusName);

  List<StatusSelectOption> findSelectOptionsByOrderByNameAsc();
}
