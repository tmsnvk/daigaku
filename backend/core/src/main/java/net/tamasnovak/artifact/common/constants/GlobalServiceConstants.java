/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.common.constants;

import org.springframework.stereotype.Component;

/**
 * Stores application-wide service layer constants.
 *
 * @since 0.0.1
 */
@Component
public final class GlobalServiceConstants {
  public static final String NO_RECORD_FOUND = "A requested record was not found in the database. Refresh your browser or try again later.";
  public static final String NO_PERMISSION = "You have no permission to view this record.";

  private GlobalServiceConstants() {
    // Class should not be initialised.
  }
}
