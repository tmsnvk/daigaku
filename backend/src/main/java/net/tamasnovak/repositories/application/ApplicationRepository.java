package net.tamasnovak.repositories.application;

import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
  List<Application> findApplicationsByStudent(Student student);
  Optional<Application> findByUuid(UUID uuid);
  @Modifying
  @Query(value =
    """
      UPDATE
        applications
      SET
        is_removable = NOT is_removable
      WHERE
        uuid = :uuid
    """, nativeQuery = true
  )
  void updateIsMarkedForDeletionByUuid(@Param("uuid") UUID uuid);
}
