package net.tamasnovak.domain.applicationStages.applicationStatus.persistence;

import net.tamasnovak.domain.applicationStages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Long> {
  Optional<ApplicationStatus> findByUuid(UUID uuid);

  Optional<ApplicationStatus> findByName(String statusName);

  List<StatusSelectOption> findAllByOrderByNameAsc();
}
