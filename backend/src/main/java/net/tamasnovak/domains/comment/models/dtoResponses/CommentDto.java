package net.tamasnovak.domains.comment.models.dtoResponses;

import net.tamasnovak.domains.comment.persistence.CommentView;

import java.sql.Timestamp;
import java.util.UUID;

public record CommentDto(
  UUID uuid,
  String content,
  Timestamp createdAt,
  Timestamp lastUpdatedAt,
  String createdBy,
  String lastModifiedBy
) {
  public CommentDto(CommentView commentView) {
    this(
      commentView.getUuid(),
      commentView.getContent(),
      commentView.getCreatedAt(),
      commentView.getLastUpdatedAt(),
      commentView.getCreatedBy(),
      commentView.getLastModifiedBy()
    );
  }
}
