package net.tamasnovak.domain.comment.service;

import net.tamasnovak.domain.comment.dto.NewComment;
import net.tamasnovak.domain.comment.dto.CommentDetails;
import net.tamasnovak.domain.comment.dto.CommentsPagination;

import java.util.UUID;

public interface CommentService {
  CommentsPagination getAllCommentResponsesByApplicationUuid(UUID applicationUuid, int page);

  CommentDetails getCommentDtoByUuid(UUID uuid);

  void postCommentByApplicationUuid(UUID applicationUuid, NewComment body);
}
