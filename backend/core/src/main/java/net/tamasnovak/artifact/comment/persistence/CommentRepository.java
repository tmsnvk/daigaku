package net.tamasnovak.artifact.comment.persistence;

import net.tamasnovak.artifact.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, Long> {
  @Query(value =
    """
      SELECT
        comments.uuid AS uuid,
        comments.content AS comment,
        comments.created_at AS createdAt,
        comments.last_updated_at AS lastUpdatedAt,
        accounts.full_name AS createdBy,
        accounts.full_name AS lastModifiedBy
      FROM
        comments
      JOIN
        accounts ON comments.account_id = accounts.id
      JOIN
        applications ON comments.application_id = applications.id
      WHERE
        applications.uuid = :uuid
    """,
    countQuery = """
      SELECT
        count(*)
      FROM
        comments
      JOIN
        accounts ON comments.account_id = accounts.id
      JOIN
        applications ON comments.application_id = applications.id
      WHERE
        applications.uuid = :uuid
      """,
    nativeQuery = true)
  Page<CommentView> findAllCommentViewsByApplicationUuid(@Param("uuid") UUID uuid, Pageable pageable);

  @Query(value =
    """
      SELECT
        comments.uuid AS uuid,
        comments.content AS comment,
        comments.created_at AS createdAt,
        comments.last_updated_at AS lastUpdatedAt,
        accounts.full_name AS createdBy,
        accounts.full_name AS lastModifiedBy
      FROM
        comments
      JOIN
        accounts ON comments.account_id = accounts.id
      WHERE
        comments.uuid = :uuid
    """, nativeQuery = true)
  Optional<CommentView> findCommentViewByUuid(@Param("uuid") UUID uuid);
}
