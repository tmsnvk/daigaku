package net.tamasnovak.artifact.applicationstages.responsestatus.persistence;

import net.tamasnovak.artifact.applicationstages.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  Optional<ResponseStatus> findByUuid(UUID uuid);

  Optional<ResponseStatus> findByName(String statusName);

  List<StatusSelectOption> findAllByOrderByNameAsc();
}
