package net.tamasnovak.domain.application.application.persistence;

import java.util.UUID;

public interface ApplicationIdsView {
  UUID getStudentOwnerAccountUuid();
  UUID getStudentMentorAccountUuid();
}
