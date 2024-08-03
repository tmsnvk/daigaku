package net.tamasnovak.domains.comment.service;

import net.tamasnovak.domains.comment.dto.NewComment;
import net.tamasnovak.domains.comment.dto.CommentDetails;
import net.tamasnovak.domains.comment.dto.CommentsPagination;

public interface CommentService {
  CommentsPagination getAllCommentResponsesByApplicationUuid(String applicationUuid, int page);

  CommentDetails getCommentDtoByUuid(String uuid);

  void postCommentByApplicationUuid(String applicationUuid, NewComment requestBody);
}
