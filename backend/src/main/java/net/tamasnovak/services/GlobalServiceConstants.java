package net.tamasnovak.services;

import org.springframework.stereotype.Component;

@Component
public final class GlobalServiceConstants {
  public final String NO_RECORD_FOUND = "The requested record was not found in the database.";

  private GlobalServiceConstants() {}
}
