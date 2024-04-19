package net.tamasnovak.repositories.applicationStatus;

import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.projections.status.GenericStatusView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Long> {
  ApplicationStatus findByName(String statusName);
  Optional<ApplicationStatus> findByUuid(UUID uuid);
  List<GenericStatusView> findAllProjectedBy();
}
