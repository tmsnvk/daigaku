package net.tamasnovak.dtos.application.request;

import java.util.UUID;

public record UpdateApplicationByStudentDto(
  UUID applicationStatusUuid,
  UUID interviewStatusUuid,
  UUID offerStatusUuid,
  UUID responseStatusUuid,
  UUID finalDestinationStatusUuid
) {}
