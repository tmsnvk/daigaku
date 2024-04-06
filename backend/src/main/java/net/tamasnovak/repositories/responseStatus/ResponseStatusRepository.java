package net.tamasnovak.repositories.responseStatus;

import net.tamasnovak.entities.application.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseStatusRepository extends JpaRepository<ResponseStatus, Long> {
  List<ResponseStatus> findAll();
}
