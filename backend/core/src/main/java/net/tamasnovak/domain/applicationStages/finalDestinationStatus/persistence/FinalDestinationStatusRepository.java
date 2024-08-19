package net.tamasnovak.domain.applicationStages.finalDestinationStatus.persistence;

import net.tamasnovak.domain.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FinalDestinationStatusRepository extends JpaRepository<FinalDestinationStatus, Long> {
  Optional<FinalDestinationStatus> findByUuid(UUID uuid);

  Optional<FinalDestinationStatus> findByName(String statusName);

  List<StatusSelectOption> findAllByOrderByNameAsc();
}
