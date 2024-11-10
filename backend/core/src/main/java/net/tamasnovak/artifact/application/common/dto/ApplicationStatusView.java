/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.common.dto;

import java.util.UUID;

import net.tamasnovak.artifact.application.common.persistence.ApplicationView;

/**
 * Represents a projection of a selected status field for an {@link ApplicationView}.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public record ApplicationStatusView(
  UUID uuid,

  String name
) {
}
