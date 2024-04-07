package net.tamasnovak.repositories.offerStatus;

import net.tamasnovak.entities.application.OfferStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OfferStatusRepository extends JpaRepository<OfferStatus, Long> {
  List<OfferStatus> findAll();
  OfferStatus findByUuid(UUID uuid);
}
