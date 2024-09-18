package net.tamasnovak.artifact.comment.dto;

import net.tamasnovak.artifact.comment.persistence.CommentView;

import java.sql.Timestamp;
import java.util.UUID;

public record CommentDetails(
  UUID uuid,
  String comment,
  Timestamp createdAt,
  Timestamp lastUpdatedAt,
  String createdBy,
  String lastModifiedBy
) {
  public CommentDetails(CommentView commentView) {
    this(
      commentView.getUuid(),
      commentView.getComment(),
      Timestamp.from(commentView.getCreatedAt()),
      Timestamp.from(commentView.getLastUpdatedAt()),
      commentView.getCreatedBy(),
      commentView.getLastModifiedBy()
    );
  }
}
