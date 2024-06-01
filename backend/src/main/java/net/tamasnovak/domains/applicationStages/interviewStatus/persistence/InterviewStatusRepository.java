package net.tamasnovak.domains.applicationStages.interviewStatus.persistence;

import net.tamasnovak.domains.applicationStages.interviewStatus.models.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InterviewStatusRepository extends JpaRepository<InterviewStatus, Long> {
  Optional<InterviewStatus> findByUuid(UUID uuid);

  Optional<InterviewStatus> findByName(String statusName);

  List<StageSelectOptionDto> findAllByOrderByNameAsc();
}
