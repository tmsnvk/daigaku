package net.tamasnovak.artifact.application.application.persistence;

import java.util.UUID;

public interface ApplicationIdsView {
  UUID getStudentOwnerAccountUuid();
  UUID getStudentMentorAccountUuid();
}
