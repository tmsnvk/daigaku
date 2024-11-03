/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.dto;

import java.util.List;

/**
 * Represents a comment pagination metadata object.
 *
 * @since 0.0.1
 */
public record CommentPaginationResponse(
  int totalPages,

  int currentPage,

  long totalComments,

  List<CommentViewResponse> comments
) {
}
