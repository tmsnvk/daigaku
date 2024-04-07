package net.tamasnovak.repositories.application;

import net.tamasnovak.entities.account.accountsByRole.Student;
import net.tamasnovak.entities.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
  List<Application> findApplicationsByStudentId(Student studentId);
  @Query(
    value = """
      SELECT
        (SELECT
          countries.name
        FROM
          applications
        INNER JOIN
          countries ON applications.country_id = countries.id
        WHERE
          response_status_id = 1),
        (SELECT
          universities.name
        FROM
          applications
        INNER JOIN
          universities ON applications.university_id = universities.id
        WHERE
          response_status_id = 1),
        (SELECT
          course_name
        FROM
          applications
        WHERE
          response_status_id = 1),
        (SELECT
          countries.name
        FROM
          applications
        INNER JOIN
          countries ON applications.country_id = countries.id
        WHERE
          final_destination_status_id = 1),
        (SELECT
          universities.name
        FROM
          applications
        INNER JOIN
          universities ON applications.university_id = universities.id
        WHERE
          final_destination_status_id = 1),
        (SELECT
          course_name
        FROM
          applications
        WHERE
          final_destination_status_id = 1),
        (SELECT COUNT(*) FROM applications) AS number_of_applications,
        (SELECT COUNT(CASE
          WHEN
            applications.application_status_id = 1
          THEN
            1
          END) FROM applications) AS number_of_planned_status,
        (SELECT COUNT(CASE
          WHEN
            applications.application_status_id = 2
          THEN
            1
          END) FROM applications) AS number_of_submitted_status,
        (SELECT COUNT(CASE
          WHEN
            applications.application_status_id = 3
          THEN
            1
          END) FROM applications) AS number_of_withdrawn_status,
        (SELECT COUNT(
          DISTINCT
            applications.country_id
        ) FROM applications) AS number_of_distinct_countries,
        (SELECT COUNT(
          DISTINCT
            applications.university_id
        ) FROM applications) AS number_of_distinct_universities,
        (SELECT COUNT(CASE
          WHEN
            applications.interview_status_id IS NULL
          THEN
            1
          END) FROM applications) AS interviews_not_set,
        (SELECT COUNT(CASE
          WHEN
            applications.offer_status_id IN (1, 2, 3)
          THEN
            1
          END) FROM applications) AS number_of_offers
      FROM
        applications
      WHERE
        student_id = :studentId
    """, nativeQuery = true
  )
  List<Object[]> getStudentDashboardData(@Param("studentId") long studentId);
  Application findByUuid(UUID uuid);
}
