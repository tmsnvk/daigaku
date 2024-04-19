package net.tamasnovak.services;

import org.springframework.stereotype.Component;

@Component
public final class GlobalServiceConstants {
  public final String NO_RESOURCE_FOUND = "The requested item was not found in the database.";

  private GlobalServiceConstants() {}
}
