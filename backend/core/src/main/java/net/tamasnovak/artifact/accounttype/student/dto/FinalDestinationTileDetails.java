/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.dto;

import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardDetails;

/**
 * Represents a final destination tile object that is part of the {@link StudentDashboardDetails} object.
 *
 * @param countryName The country's name.
 * @param universityName The university's name.
 * @param courseName The course's name.
 */
public record FinalDestinationTileDetails(
  String countryName,

  String universityName,

  String courseName
) {
}
