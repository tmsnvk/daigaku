package net.tamasnovak.domains.applicationStages.applicationStatus.persistence;

import net.tamasnovak.domains.applicationStages.applicationStatus.models.entity.ApplicationStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Long> {
  Optional<ApplicationStatus> findByUuid(UUID uuid);

  Optional<ApplicationStatus> findByName(String statusName);

  List<StageSelectOptionDto> findAllByOrderByNameAsc();
}
