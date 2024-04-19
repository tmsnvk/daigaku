package net.tamasnovak.repositories.application;

import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
  List<Application> findApplicationsByStudent(Student student);
  Optional<Application> findByUuid(UUID uuid);
}
