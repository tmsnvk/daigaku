package net.tamasnovak.repositories.responseStatus;

import net.tamasnovak.entities.application.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  ResponseStatus findByName(String statusName);
  List<ResponseStatus> findAll();
  ResponseStatus findByUuid(UUID uuid);
}
