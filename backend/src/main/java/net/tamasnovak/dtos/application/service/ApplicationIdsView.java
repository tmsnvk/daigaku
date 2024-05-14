package net.tamasnovak.dtos.application.service;

import java.util.UUID;

public interface ApplicationIdsView {
  UUID getStudentOwnerAccountUuid();
  UUID getStudentMentorAccountUuid();
}
