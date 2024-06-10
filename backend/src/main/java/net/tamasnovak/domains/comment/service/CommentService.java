package net.tamasnovak.domains.comment.service;

import net.tamasnovak.domains.comment.models.dtoRequests.NewCommentDto;
import net.tamasnovak.domains.comment.models.dtoResponses.CommentDto;
import net.tamasnovak.domains.comment.models.dtoResponses.CommentsMetaDto;

public interface CommentService {
  CommentsMetaDto getAllCommentDtosByApplicationUuid(String applicationUuid, int page);

  CommentDto getCommentDtoByUuid(String uuid);

  void postCommentByApplicationUuid(String applicationUuid, NewCommentDto requestBody);
}
