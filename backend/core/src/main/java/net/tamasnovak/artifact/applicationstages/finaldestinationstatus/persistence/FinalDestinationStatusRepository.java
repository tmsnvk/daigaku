package net.tamasnovak.artifact.applicationstages.finaldestinationstatus.persistence;

import net.tamasnovak.artifact.applicationstages.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FinalDestinationStatusRepository extends JpaRepository<FinalDestinationStatus, Long> {
  Optional<FinalDestinationStatus> findByUuid(UUID uuid);

  Optional<FinalDestinationStatus> findByName(String statusName);

  List<StatusSelectOption> findAllByOrderByNameAsc();
}
