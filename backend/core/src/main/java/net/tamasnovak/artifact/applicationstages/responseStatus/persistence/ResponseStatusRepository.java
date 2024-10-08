package net.tamasnovak.artifact.applicationstages.responseStatus.persistence;

import net.tamasnovak.artifact.applicationstages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  Optional<ResponseStatus> findByUuid(UUID uuid);

  Optional<ResponseStatus> findByName(String statusName);

  List<StatusDropdownOption> findAllByOrderByNameAsc();
}
