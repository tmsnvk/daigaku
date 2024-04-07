package net.tamasnovak.dtos.application;

import java.util.UUID;

public record UpdateApplicationByStudentDto(
  UUID applicationStatus,
  UUID interviewStatus,
  UUID offerStatus,
  UUID responseStatus,
  UUID finalDestinationStatus
) {}
