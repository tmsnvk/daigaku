/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.dto;

import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardDetails;

/**
 * Represents a firm choice tile object that is part of the {@link StudentDashboardDetails} object.
 *
 * @param countryName The country's name.
 * @param universityName The university's name.
 * @param courseName The course's name.
 * @since 0.0.1
 */
public record FirmChoiceTileDetails(
  String countryName,

  String universityName,

  String courseName
) {
}
