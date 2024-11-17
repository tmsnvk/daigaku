/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.dto;

import java.sql.Timestamp;
import java.util.UUID;

import net.tamasnovak.artifact.comment.persistence.CommentView;

/**
 * Represents a comment object as it is used on the front-end.
 *
 * @param uuid The comment's uuid.
 * @param comment The comment content.
 * @param createdAt The timestamp when the comment was created.
 * @param lastUpdatedAt The timestamp when the comment was last updated.
 * @param createdBy The account name that created the comment.
 * @param lastModifiedBy The account name that last updated the comment.
 * @since 0.0.1
 */
public record CommentViewResponse(
  UUID uuid,

  String comment,

  Timestamp createdAt,

  Timestamp lastUpdatedAt,

  String createdBy,

  String lastModifiedBy
) {
  public CommentViewResponse(CommentView commentView) {
    this(
      commentView.getUuid(),
      commentView.getComment(),
      Timestamp.from(commentView.getCreatedAt()),
      Timestamp.from(commentView.getLastUpdatedAt()),
      commentView.getCreatedBy(),
      commentView.getLastModifiedBy()
    );
  }
}
