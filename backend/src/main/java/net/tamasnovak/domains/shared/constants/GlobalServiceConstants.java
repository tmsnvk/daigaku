package net.tamasnovak.domains.shared.constants;

import org.springframework.stereotype.Component;

@Component
public final class GlobalServiceConstants {
  public final String NO_RECORD_FOUND = "The requested record was not found in the database.";
  public final String NO_PERMISSION = "You have no permission to view this record.";

  private GlobalServiceConstants() {}
}
