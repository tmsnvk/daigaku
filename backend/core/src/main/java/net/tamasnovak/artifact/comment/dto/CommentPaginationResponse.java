/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.dto;

import java.util.List;

/**
 * Represents a comment pagination metadata object.
 *
 * @param totalPages The number of total pages of comments associated with the given Application object.
 * @param currentPage The current page number that was requested by the authenticated user.
 * @param totalComments The total number of comments.
 * @param comments The list of comments that are associated with the selected page number.
 */
public record CommentPaginationResponse(
  int totalPages,

  int currentPage,

  long totalComments,

  List<CommentViewResponse> comments
) {
}
