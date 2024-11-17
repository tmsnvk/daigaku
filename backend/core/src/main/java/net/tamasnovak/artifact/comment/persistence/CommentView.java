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

import net.tamasnovak.artifact.comment.entity.Comment;

/**
 * Interface projection providing a view of selected identifiers for {@link Comment} objects.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface CommentView {
  UUID getUuid();

  String getComment();

  Instant getCreatedAt();

  Instant getLastUpdatedAt();

  String getCreatedBy();

  String getLastModifiedBy();
}
