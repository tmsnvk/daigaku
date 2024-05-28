package net.tamasnovak.dtos.country;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record CountrySelectOptionDto(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
