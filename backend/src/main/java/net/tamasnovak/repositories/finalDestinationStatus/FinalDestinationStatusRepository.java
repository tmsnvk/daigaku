package net.tamasnovak.repositories.finalDestinationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FinalDestinationStatusRepository extends JpaRepository<FinalDestinationStatus, Long> {
  List<StatusSelectOptionView> findAllByOrderByNameAsc();
  Optional<FinalDestinationStatus> findByUuid(UUID uuid);
}
