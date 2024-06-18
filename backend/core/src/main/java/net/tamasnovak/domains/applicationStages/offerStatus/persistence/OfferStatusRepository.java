package net.tamasnovak.domains.applicationStages.offerStatus.persistence;

import net.tamasnovak.domains.applicationStages.offerStatus.models.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OfferStatusRepository extends JpaRepository<OfferStatus, Long> {
  Optional<OfferStatus> findByUuid(UUID uuid);

  Optional<OfferStatus> findByName(String statusName);

  List<StageSelectOptionDto> findAllByOrderByNameAsc();
}
