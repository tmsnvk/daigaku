package net.tamasnovak.artifact.applicationstatus.common.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

/**
 * Represents a status object that is used on the frontend in various form dropdown input elements.
 *
 * @param uuid The status's uuid.
 * @param name The status's name.
 * @since 0.0.1
 */
public record StatusSelectOption(
  UUID uuid,

  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
