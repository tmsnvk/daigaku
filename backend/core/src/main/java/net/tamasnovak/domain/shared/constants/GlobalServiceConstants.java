package net.tamasnovak.domain.shared.constants;

import org.springframework.stereotype.Component;

@Component
public final class GlobalServiceConstants {
  public final String NO_RECORD_FOUND = "A requested record was not found in the database. Refresh your browser or try again later.";
  public final String NO_PERMISSION = "You have no permission to view this record.";

  private GlobalServiceConstants() {}
}
