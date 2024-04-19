package net.tamasnovak.repositories.responseStatus;

import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.projections.status.GenericStatusView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  List<GenericStatusView> findAllProjectedBy();
  Optional<ResponseStatus> findByUuid(UUID uuid);
}
