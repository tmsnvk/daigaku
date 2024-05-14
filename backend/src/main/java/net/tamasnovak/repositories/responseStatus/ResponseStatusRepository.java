package net.tamasnovak.repositories.responseStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  List<StatusSelectOptionView> findAllByOrderByNameAsc();

  Optional<ResponseStatus> findByUuid(UUID uuid);
}
