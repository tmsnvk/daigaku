package net.tamasnovak.repositories.application;

import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
  List<Application> findApplicationsByStudentId(Student studentId);
  Optional<Application> findByUuid(UUID uuid);
  Application findByStudentIdAndResponseStatusId(Student student, ResponseStatus responseStatus);
  Application findByStudentIdAndFinalDestinationStatusId(Student student, FinalDestinationStatus finalDestinationStatus);
  int countAllByStudentId(Student student);
  int countAllByStudentIdAndApplicationStatusId(Student student, ApplicationStatus applicationStatus);
  @Query(
    value = """
      SELECT
        COUNT(DISTINCT country_id)
      FROM
        applications
      WHERE
        student_id = :studentId
      GROUP BY
        student_id;
    """, nativeQuery = true
  )
  int countDistinctByCountryIdAndStudentId(@Param("studentId") long studentId);
  @Query(
    value = """
      SELECT
        COUNT(DISTINCT university_id)
      FROM
        applications
      WHERE
        student_id = :studentId
      GROUP BY
        student_id;
    """, nativeQuery = true
  )
  int countDistinctByUniversityIdAndStudentId(@Param("studentId") long studentId);
  int countByStudentIdAndInterviewStatusIdIsNull(Student student);
  int countAllByStudentIdAndOfferStatusIdIsNotNull(Student student);
}
