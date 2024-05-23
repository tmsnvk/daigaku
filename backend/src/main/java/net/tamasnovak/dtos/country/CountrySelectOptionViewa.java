package net.tamasnovak.dtos.country;

import java.io.Serializable;
import java.util.UUID;

public interface CountrySelectOptionViewa extends Serializable {
  UUID getUuid();
  String getName();
}
