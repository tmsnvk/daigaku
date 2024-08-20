package net.tamasnovak.artifact.applicationstages.offerStatus.persistence;

import net.tamasnovak.artifact.applicationstages.offerStatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OfferStatusRepository extends JpaRepository<OfferStatus, Long> {
  Optional<OfferStatus> findByUuid(UUID uuid);

  Optional<OfferStatus> findByName(String statusName);

  List<StatusDropdownOption> findAllByOrderByNameAsc();
}
