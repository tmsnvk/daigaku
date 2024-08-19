package net.tamasnovak.artifact.comment.service;

import net.tamasnovak.artifact.comment.dto.NewComment;
import net.tamasnovak.artifact.comment.dto.CommentDetails;
import net.tamasnovak.artifact.comment.dto.CommentPagination;

import java.util.UUID;

public interface CommentService {
  CommentPagination findAllByApplicationUuid(UUID uuid, int page);

//  CommentDetails getCommentDtoByUuid(UUID uuid);

  void createByApplicationUuid(UUID uuid, NewComment requestBody);
}
