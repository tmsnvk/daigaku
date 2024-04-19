package net.tamasnovak.repositories.interviewStatus;

import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.projections.status.StatusOptionView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InterviewStatusRepository extends JpaRepository<InterviewStatus, Long> {
  List<StatusOptionView> findAllByOrderByNameAsc();
  Optional<InterviewStatus> findByUuid(UUID uuid);
}
