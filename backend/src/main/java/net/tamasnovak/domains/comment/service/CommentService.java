package net.tamasnovak.domains.comment.service;

import net.tamasnovak.domains.comment.dtoResponse.CommentDto;
import net.tamasnovak.domains.comment.models.dtoRequests.NewCommentDto;

public interface CommentService {
  CommentDto getCommentDtoByUuid(String uuid);

  CommentDto postCommentByApplicationUuid(String applicationUuid, NewCommentDto requestBody);
}
