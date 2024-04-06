package net.tamasnovak.repositories;

import net.tamasnovak.entities.application.OfferStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfferStatusRepository extends JpaRepository<OfferStatus, Long> {
  List<OfferStatus> findAll();
}
