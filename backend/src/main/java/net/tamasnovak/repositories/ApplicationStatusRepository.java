package net.tamasnovak.repositories;

import net.tamasnovak.entities.application.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Long> {
  ApplicationStatus findByName(String statusName);
}
