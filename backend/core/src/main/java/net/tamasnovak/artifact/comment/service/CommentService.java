/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.comment.service;

import java.util.UUID;

import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.comment.dto.CommentPaginationResponse;
import net.tamasnovak.artifact.comment.dto.NewCommentRequest;
import net.tamasnovak.artifact.comment.entity.Comment;

/**
 * Service interface for managing {@link Comment} entity-related API operations.
 *
 * @since 0.0.1
 */
public interface CommentService {
  /**
   * Finds all comments associated with a specific {@link Application}, identified by the provided uuid, and returns them in a paginated
   * format.
   *
   * @param applicationUuid The application's uuid.
   * @param page The selected page number.
   * @return {@link CommentPaginationResponse}.
   */
  CommentPaginationResponse findAllCommentsByApplicationUuid(UUID applicationUuid, int page);

  /**
   * Creates a {@link Comment} associated with a specific application, identified by the provided uuid.
   *
   * @param applicationUuid The application's uuid.
   * @param requestBody The comment request body.
   */
  void createCommentByApplicationUuid(UUID applicationUuid, NewCommentRequest requestBody);
}
