/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions;

import org.springframework.stereotype.Component;

/**
 * Stores controller advice-related exception messages.
 *
 * @since 0.0.1
 */
@Component
public final class ControllerExceptionMessages {
  static final String INVALID_DATA =
    "The request failed as it contained invalid data. Use the correct values before submitting them again.";
  static final String INVALID_AUTHENTICATION = "Incorrect authentication credentials were provided.";

  private ControllerExceptionMessages() {
    // Class should not be initialised.
  }
}
