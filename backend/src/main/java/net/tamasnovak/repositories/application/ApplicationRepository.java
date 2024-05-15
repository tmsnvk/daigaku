package net.tamasnovak.repositories.application;

import net.tamasnovak.dtos.application.response.ApplicationView;
import net.tamasnovak.dtos.application.service.ApplicationIdsView;
import net.tamasnovak.entities.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
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
        application_status.name AS applicationStatus,
        interview_status.name AS interviewStatus,
        offer_status.name AS offerStatus,
        response_status.name AS responseStatus,
        final_destination_status.name AS finalDestinationStatus,
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
        applications.student_id = :studentId
    """, nativeQuery = true)
  List<ApplicationView> findApplicationsByStudent(@Param("studentId") long studentId);

  @Query(value =
    """
      SELECT
        applications.uuid,
        accounts.uuid AS accountUuid,
        countries.name AS country,
        universities.name AS university,
        applications.course_name AS courseName,
        applications.minor_subject AS minorSubject,
        applications.programme_length AS programmeLength,
        application_status.name AS applicationStatus,
        interview_status.name AS interviewStatus,
        offer_status.name AS offerStatus,
        response_status.name AS responseStatus,
        final_destination_status.name AS finalDestinationStatus,
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
        applications.uuid = :uuid
    """, nativeQuery = true)
  Optional<ApplicationView> findApplicationViewByUuid(@Param("uuid") UUID uuid);

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
    """, nativeQuery = true)
  void updateIsRemovableByUuid(@Param("uuid") UUID uuid);

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
