package net.tamasnovak.domains.comment.service;

import net.tamasnovak.domains.comment.models.dtoRequests.NewCommentDto;
import net.tamasnovak.domains.comment.models.dtoResponses.CommentDto;

import java.util.List;

public interface CommentService {
  List<CommentDto> getAllCommentDtosByApplicationUuid(String applicationUuid);

  CommentDto getCommentDtoByUuid(String uuid);

  CommentDto postCommentByApplicationUuid(String applicationUuid, NewCommentDto requestBody);
}
