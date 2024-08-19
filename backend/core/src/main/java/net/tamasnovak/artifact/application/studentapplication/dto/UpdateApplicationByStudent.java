package net.tamasnovak.artifact.application.studentapplication.dto;

import jakarta.validation.constraints.NotNull;
import net.tamasnovak.validation.annotations.optionalvaliduuid.OptionalValidUUID;

import java.util.UUID;

public record UpdateApplicationByStudent(
  @NotNull(message = "Select a status.")
  @OptionalValidUUID(message = "Select a valid status.")
  UUID applicationStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUUID(message = "Select a valid status.")
  UUID interviewStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUUID(message = "Select a valid status.")
  UUID offerStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUUID(message = "Select a valid status.")
  UUID responseStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUUID(message = "Select a valid status.")
  UUID finalDestinationStatusUuid
) {}
