package net.tamasnovak.repositories.applicationStatus;

import net.tamasnovak.entities.application.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Long> {
  ApplicationStatus findByName(String statusName);
  List<ApplicationStatus> findAll();
}
