package net.tamasnovak.domains.support.country.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

public record CountrySelectOption(
  UUID uuid,
  String name
) implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
}
