package net.tamasnovak.domains.comment.persistence;

import java.sql.Timestamp;
import java.util.UUID;

public interface CommentView {
  UUID getUuid();
  String getContent();
  Timestamp getCreatedAt();
  Timestamp getLastUpdatedAt();
  String getCreatedBy();
  String getLastModifiedBy();
}
