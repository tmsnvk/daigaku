/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.persistence;

import java.time.Instant;
import java.util.UUID;

import net.tamasnovak.artifact.comment.dto.CommentViewResponse;

/**
 * Represents the projection of a {@link CommentViewResponse} object.
 *
 * @since 0.0.1
 */
public interface CommentViewProjection {
  UUID getUuid();

  String getComment();

  Instant getCreatedAt();

  Instant getLastUpdatedAt();

  String getCreatedBy();

  String getLastModifiedBy();
}
