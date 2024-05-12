package net.tamasnovak.repositories.interviewStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InterviewStatusRepository extends JpaRepository<InterviewStatus, Long> {
  List<StatusSelectOptionView> findAllByOrderByNameAsc();
  Optional<InterviewStatus> findByUuid(UUID uuid);
}
