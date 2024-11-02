/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.dto;

import jakarta.validation.constraints.NotNull;
import net.tamasnovak.validation.annotations.optionalvaliduuid.OptionalValidUuid;

/**
 * Represents the details of an updated application submitted by a student authenticated user.
 *
 * @since 0.0.1
 */
public record UpdateApplicationByStudent(
  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String applicationStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String interviewStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String offerStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String responseStatusUuid,

  @NotNull(message = "Select a status.")
  @OptionalValidUuid(message = "Select a valid status.")
  String finalDestinationStatusUuid
) {
}
