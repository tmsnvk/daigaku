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

import net.tamasnovak.artifact.comment.persistence.CommentViewProjection;

/**
 * Represents a comment object as it is used on the front-end.
 *
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
  public CommentViewResponse(CommentViewProjection commentViewProjection) {
    this(
      commentViewProjection.getUuid(),
      commentViewProjection.getComment(),
      Timestamp.from(commentViewProjection.getCreatedAt()),
      Timestamp.from(commentViewProjection.getLastUpdatedAt()),
      commentViewProjection.getCreatedBy(),
      commentViewProjection.getLastModifiedBy()
    );
  }
}
