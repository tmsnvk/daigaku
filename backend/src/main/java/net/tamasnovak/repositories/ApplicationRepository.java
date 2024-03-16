package net.tamasnovak.repositories;

import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
  Optional<List<Application>> findAllByAccountId(Account accountId);
  @Query(
    value = """
      SELECT
        (SELECT
          countries.name
        FROM
          applications
        INNER JOIN
          countries ON applications.country = countries.id
        WHERE
          final_destination_status_id = 1),
        (SELECT
          universities.name
        FROM
          applications
        INNER JOIN
          universities ON applications.university = universities.id
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
            applications.country
        ) FROM applications) AS number_of_distinct_countries,
        (SELECT COUNT(
          DISTINCT
            applications.university
        ) FROM applications) AS number_of_distinct_universities,
        (SELECT COUNT(CASE
          WHEN
            applications.offer_status_id IN (1, 2, 3)
          THEN
            1
          END) FROM applications) AS number_of_offers
      FROM
        applications
      WHERE
        account_id = :accountId AND
        final_destination_status_id = 1
    """, nativeQuery = true
  )
  List<Object[]> getStudentDashboardData(@Param("accountId") long accountId);
}
