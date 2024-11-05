/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 * @since 0.0.1
 */
public record InstitutionSelectOption(
  UUID uuid,

  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
