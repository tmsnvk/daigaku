/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.common.dto;

import java.util.UUID;

import net.tamasnovak.artifact.application.common.persistence.ApplicationView;

/**
 * Represents a projection of a selected status field for an {@link ApplicationView}.
 */
public record ApplicationStatusView(
  UUID uuid,

  String name
) {
}
