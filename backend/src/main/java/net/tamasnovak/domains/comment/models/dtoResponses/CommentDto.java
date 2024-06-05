package net.tamasnovak.domains.comment.models.dtoResponses;

import net.tamasnovak.domains.comment.persistence.CommentView;

import java.time.Instant;
import java.util.UUID;

public record CommentDto(
  UUID uuid,
  String content,
  Instant createdAt,
  Instant lastUpdatedAt,
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
