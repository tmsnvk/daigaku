/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.validation.annotations.validuuid.ValidUuid;

/**
 * Represents the details of a new application submitted by a {@link Student} authenticated user.
 *
 * @param countryUuid The application's country uuid.
 * @param universityUuid The application's university uuid.
 * @param courseName The application's course name.
 * @param minorSubject The application's minor subject, if any.
 * @param programmeLength The application's program length.
 */
public record CreateApplicationByStudentPayload(
  @NotBlank(message = "Select a country.")
  @ValidUuid(message = "Select a valid country.")
  String countryUuid,

  @NotBlank(message = "Select a university.")
  @ValidUuid(message = "Select a valid university.")
  String universityUuid,

  @NotBlank(message = "Provide the name of your course.")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{1,255}$", message =
    "Use only letters, spaces or hyphens. Provide a minimum of 1 and a maximum of 255 characters.")
  String courseName,

  @Pattern(regexp = "^(?:[\\p{IsAlphabetic}\\s-]{1,255}|)$", message =
    "Use only letters, spaces or hyphens. Provide a minimum of 1 and a maximum of 255 characters.")
  String minorSubject,

  @NotNull(message = "Provide the length (year) of your selected course.")
  @Min(value = 1, message = "Programme length should not be less than {value}.")
  @Max(value = 5, message = "Programme length should not be more than {value}.")
  int programmeLength
) {
}
