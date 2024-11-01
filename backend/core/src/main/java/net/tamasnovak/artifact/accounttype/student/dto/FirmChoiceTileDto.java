/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.dto;

import net.tamasnovak.artifact.application.studentApplication.dto.StudentDashboardStatistics;

/**
 * Represents a firm choice object that is part of the {@link StudentDashboardStatistics} object.
 *
 * @since 0.0.1
 */
public record FirmChoiceTileDto(
  String country,

  String university,

  String courseName
) {
}
