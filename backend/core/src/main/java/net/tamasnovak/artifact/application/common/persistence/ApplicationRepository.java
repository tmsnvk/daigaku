/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.common.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.accounttype.mentor.entity.Mentor;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.artifact.application.common.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * JPA repository for {@link Application} entities.
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface ApplicationRepository extends JpaRepository<Application, Long> {
  /**
   * Finds a list of {@link ApplicationView} projections that is associated with the provided account uuid.
   *
   * @param accountUuid The provided account uuid.
   * @return A list of {@link ApplicationView}.
   */
  @Query(value =
    """
        SELECT
          applications.uuid AS uuid,
          accounts.uuid AS accountUuid,
          countries.name AS country,
          universities.name AS university,
          applications.course_name AS courseName,
          applications.minor_subject AS minorSubject,
          applications.programme_length AS programmeLength,
          application_status.uuid AS applicationStatusUuid,
          application_status.name AS applicationStatusName,
          interview_status.uuid AS interviewStatusUuid,
          interview_status.name AS interviewStatusName,
          offer_status.uuid AS offerStatusUuid,
          offer_status.name AS offerStatusName,
          response_status.uuid AS responseStatusUuid,
          response_status.name AS responseStatusName,
          final_destination_status.uuid AS finalDestinationStatusUuid,
          final_destination_status.name AS finalDestinationStatusName,
          applications.created_at AS createdAt,
          applications.last_updated_at AS lastUpdatedAt,
          created_by.full_name AS createdBy,
          last_modified_by.full_name AS lastModifiedBy,
          applications.is_removable AS isRemovable
        FROM
          applications
        JOIN
          students ON applications.student_id = students.id
        JOIN
          accounts ON accounts.id = students.account_id
        JOIN
          countries ON applications.country_id = countries.id
        JOIN
          universities ON applications.university_id = universities.id
        JOIN
          application_status ON applications.application_status_id = application_status.id
        FULL OUTER JOIN
          interview_status ON applications.interview_status_id = interview_status.id
        FULL OUTER JOIN
          offer_status ON applications.offer_status_id = offer_status.id
        FULL OUTER JOIN
          response_status ON applications.response_status_id = response_status.id
        FULL OUTER JOIN
          final_destination_status ON applications.final_destination_status_id = final_destination_status.id
        JOIN
          accounts AS created_by ON applications.created_by = created_by.email
        JOIN
          accounts AS last_modified_by ON applications.last_modified_by = last_modified_by.email
        WHERE
          accounts.uuid = :accountUuid
      """, nativeQuery = true)
  List<ApplicationView> findApplicationViewsByAccountUuid(@Param("accountUuid") UUID accountUuid);

  /**
   * Finds an {@link ApplicationView} projection by its uuid.
   *
   * @param uuid The provided application uuid.
   * @return {@link ApplicationView}.
   */
  @Query(value =
    """
        SELECT
          applications.uuid AS uuid,
          accounts.uuid AS accountUuid,
          countries.name AS country,
          universities.name AS university,
          applications.course_name AS courseName,
          applications.minor_subject AS minorSubject,
          applications.programme_length AS programmeLength,
          application_status.uuid AS applicationStatusUuid,
          application_status.name AS applicationStatusName,
          interview_status.uuid AS interviewStatusUuid,
          interview_status.name AS interviewStatusName,
          offer_status.uuid AS offerStatusUuid,
          offer_status.name AS offerStatusName,
          response_status.uuid AS responseStatusUuid,
          response_status.name AS responseStatusName,
          final_destination_status.uuid AS finalDestinationStatusUuid,
          final_destination_status.name AS finalDestinationStatusName,
          applications.created_at AS createdAt,
          applications.last_updated_at AS lastUpdatedAt,
          created_by.full_name AS createdBy,
          last_modified_by.full_name AS lastModifiedBy,
          applications.is_removable AS isRemovable
        FROM
          applications
        JOIN
          students ON applications.student_id = students.id
        JOIN
          accounts ON accounts.id = students.account_id
        JOIN
          countries ON applications.country_id = countries.id
        JOIN
          universities ON applications.university_id = universities.id
        FULL OUTER JOIN
          application_status ON applications.application_status_id = application_status.id
        FULL OUTER JOIN
          interview_status ON applications.interview_status_id = interview_status.id
        FULL OUTER JOIN
          offer_status ON applications.offer_status_id = offer_status.id
        FULL OUTER JOIN
          response_status ON applications.response_status_id = response_status.id
        FULL OUTER JOIN
          final_destination_status ON applications.final_destination_status_id = final_destination_status.id
        JOIN
          accounts AS created_by ON applications.created_by = created_by.email
        JOIN
          accounts AS last_modified_by ON applications.last_modified_by = last_modified_by.email
        WHERE
          applications.uuid = :uuid
      """, nativeQuery = true)
  Optional<ApplicationView> findApplicationViewByUuid(@Param("uuid") UUID uuid);

  Optional<Application> findApplicationByUuid(UUID uuid);

  /**
   * Toggles an {@link Application}'s is_removable field.
   *
   * @param applicationUuid The application's uuid.
   */
  @Modifying
  @Query(value =
    """
        UPDATE
          applications
        SET
          is_removable = NOT is_removable
        WHERE
          uuid = :applicationUuid
      """, nativeQuery = true)
  void toggleIsRemovableByApplicationUuid(@Param("applicationUuid") UUID applicationUuid);

  /**
   * Finds the {@link Student} and {@link Mentor} account uuids associated with the provided {@link Application}'s uuid.
   *
   * @param uuid The provided application's uuid.
   * @return {@link ApplicationIdsView}.
   */
  @Query(value =
    """
        SELECT
          student_account.uuid AS studentOwnerAccountUuid,
          mentor_account.uuid AS studentMentorAccountUuid
        FROM
          applications
        JOIN
          students ON applications.student_id = students.id
        JOIN
          mentors ON students.mentor_id = mentors.id
        JOIN
          accounts AS student_account ON student_account.id = students.account_id
        JOIN
          accounts AS mentor_account ON mentor_account.id = mentors.account_id
        WHERE
          applications.uuid = :uuid
      """, nativeQuery = true)
  ApplicationIdsView findApplicationRelatedIdsByUuid(@Param("uuid") UUID uuid);
}
