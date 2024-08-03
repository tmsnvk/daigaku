package net.tamasnovak.domains.comment.dto;

import net.tamasnovak.domains.comment.persistence.CommentView;

import java.sql.Timestamp;
import java.util.UUID;

public record CommentDetails(
  UUID uuid,
  String content,
  Timestamp createdAt,
  Timestamp lastUpdatedAt,
  String createdBy,
  String lastModifiedBy
) {
  public CommentDetails(CommentView commentView) {
    this(
      commentView.getUuid(),
      commentView.getContent(),
      Timestamp.from(commentView.getCreatedAt()),
      Timestamp.from(commentView.getLastUpdatedAt()),
      commentView.getCreatedBy(),
      commentView.getLastModifiedBy()
    );
  }
}
