package net.tamasnovak.artifact.comment.service;

import net.tamasnovak.artifact.comment.dto.NewComment;
import net.tamasnovak.artifact.comment.dto.CommentDetails;
import net.tamasnovak.artifact.comment.dto.CommentsPagination;

import java.util.UUID;

public interface CommentService {
  CommentsPagination getAllCommentResponsesByApplicationUuid(UUID applicationUuid, int page);

  CommentDetails getCommentDtoByUuid(UUID uuid);

  void postCommentByApplicationUuid(UUID applicationUuid, NewComment requestBody);
}
