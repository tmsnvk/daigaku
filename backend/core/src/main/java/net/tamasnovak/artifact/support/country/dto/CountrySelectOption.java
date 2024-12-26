/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.country.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

import net.tamasnovak.artifact.support.country.entity.Country;

/**
 * Represents the response object associated with a {@link Country} select option.
 *
 * @param uuid The Country's uuid.
 * @param name The Country's name.
 */
public record CountrySelectOption(
  UUID uuid,

  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
