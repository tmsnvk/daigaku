/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.common.constants;

import org.springframework.stereotype.Component;

/**
 * Stores application-wide service layer constants.
 */
@Component
public final class GlobalServiceMessages {
  public static final String NO_RECORD_FOUND = "A requested record was not found in the database. Refresh your browser or try again later.";
  public static final String NO_PERMISSION = "You have no permission to view this record.";

  private GlobalServiceMessages() {
    // Class should not be initialised.
  }
}
