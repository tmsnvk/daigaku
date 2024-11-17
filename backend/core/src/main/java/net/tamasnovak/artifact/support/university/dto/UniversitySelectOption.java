/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.university.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import net.tamasnovak.artifact.support.university.entity.University;

/**
 * Represents the response object associated with a {@link University} select option.
 *
 * @param uuid The University's uuid.
 * @param name The University's name.
 * @param abbreviation The University's abbreviation.
 * @since 0.0.1
 */
public record UniversitySelectOption(
  UUID uuid,

  String name,

  String abbreviation
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
