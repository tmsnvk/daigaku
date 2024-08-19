package net.tamasnovak.artifact.comment.persistence;

import java.time.Instant;
import java.util.UUID;

public interface CommentView {
  UUID getUuid();
  String getContent();
  Instant getCreatedAt();
  Instant getLastUpdatedAt();
  String getCreatedBy();
  String getLastModifiedBy();
}
