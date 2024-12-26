/**
 * Copyright © [Daigaku].
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
 */
public record UniversitySelectOption(
  UUID uuid,

  String name,

  String abbreviation
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
