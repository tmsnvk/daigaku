package net.tamasnovak.projections.institution;

import java.util.UUID;

public interface InstitutionOptionView {
  UUID getUuid();
  String getName();
  CityFromAddress getAddress();

  interface CityFromAddress {
    String getCity();
  }
}
