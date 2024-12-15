/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.institution.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import net.tamasnovak.artifact.support.institution.entity.Institution;

/**
 * Represents the response object associated with a {@link Institution} select option.
 *
 * @param uuid The Country's uuid.
 * @param name The Country's name.
 * @since 0.0.1
 */
public record InstitutionSelectOption(
  UUID uuid,

  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
