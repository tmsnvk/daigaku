package net.tamasnovak.domain.applicationStages.interviewStatus.persistence;

import net.tamasnovak.domain.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InterviewStatusRepository extends JpaRepository<InterviewStatus, Long> {
  Optional<InterviewStatus> findByUuid(UUID uuid);

  Optional<InterviewStatus> findByName(String statusName);

  List<StatusSelectOption> findAllByOrderByNameAsc();
}
