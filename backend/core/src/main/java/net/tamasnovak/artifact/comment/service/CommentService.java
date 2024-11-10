/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 * Service interface for handling database API calls related to the {@link Comment} entity.
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
   * @return A single {@link CommentPaginationResponse} uuid.
   */
  CommentPaginationResponse findAllCommentsByApplicationUuid(UUID applicationUuid, int page);

  /**
   * Creates a new comment associated with a specific application, identified by the provided uuid.
   *
   * @param applicationUuid The application's uuid.
   * @param requestBody The request body data.
   */
  void createCommentByApplicationUuid(UUID applicationUuid, NewCommentRequest requestBody);
}
