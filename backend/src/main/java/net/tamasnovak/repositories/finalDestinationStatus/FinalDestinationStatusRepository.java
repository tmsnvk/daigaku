package net.tamasnovak.repositories.finalDestinationStatus;

import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.projections.status.GenericStatusView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FinalDestinationStatusRepository extends JpaRepository<FinalDestinationStatus, Long> {
  List<GenericStatusView> findAllProjectedBy();
  Optional<FinalDestinationStatus> findByUuid(UUID uuid);
}
