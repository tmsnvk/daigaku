package net.tamasnovak.domains.applicationStages.responseStatus.persistence;

import net.tamasnovak.domains.applicationStages.responseStatus.models.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  Optional<ResponseStatus> findByUuid(UUID uuid);

  Optional<ResponseStatus> findByName(String statusName);

  List<StageSelectOptionDto> findAllByOrderByNameAsc();
}
