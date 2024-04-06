package net.tamasnovak.repositories.finalDestinationStatus;

import net.tamasnovak.entities.application.FinalDestinationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinalDestinationStatusRepository extends JpaRepository<FinalDestinationStatus, Long> {
  List<FinalDestinationStatus> findAll();
}
