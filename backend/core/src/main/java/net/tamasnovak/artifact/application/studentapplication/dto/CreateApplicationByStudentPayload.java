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
  @ValidUuid(message = "app.page.applicationCreate.form.validCountryRequired")
  @NotBlank(message = "app.page.applicationCreate.form.countryRequired")
  String countryUuid,

  @ValidUuid(message = "app.page.applicationCreate.form.validUniversityRequired")
  @NotBlank(message = "app.page.applicationCreate.form.universityRequired")
  String universityUuid,

  @NotBlank(message = "app.page.applicationCreate.form.courseNameRequired")
  @Pattern(regexp = "^[\\p{IsAlphabetic}\\s-]{1,255}$", message =
    "app.page.applicationCreate.form.courseNamePattern")
  String courseName,

  @Pattern(regexp = "^(?:[\\p{IsAlphabetic}\\s-]{1,255}|)$", message =
    "app.page.applicationCreate.form.minorSubjectPattern")
  String minorSubject,

  @NotNull(message = "app.page.applicationCreate.form.programmeLengthRequired")
  @Min(value = 1, message = "app.page.applicationCreate.form.programmeLengthPattern")
  @Max(value = 5, message = "app.page.applicationCreate.form.programmeLengthPattern")
  int programmeLength
) {
}
