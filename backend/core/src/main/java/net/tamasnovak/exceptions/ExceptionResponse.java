/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions;

import java.time.Instant;
import java.util.List;

/**
 * Represents an error message sent from the backend to the frontend.
 *
 * @param errorCode The response's error code.
 * @param timestamp The response's timestamp.
 * @param errors The list of error messages.
 * @since 0.0.1
 */
public record ExceptionResponse(
  int errorCode,

  Instant timestamp,

  List<ErrorDetail> errors
) {
}
