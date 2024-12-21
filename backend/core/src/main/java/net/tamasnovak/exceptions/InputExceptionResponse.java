/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions;

import java.time.Instant;
import java.util.List;

/**
 * Represents an exception response sent after a form validation error.
 *
 * @param errorCode The response's error code.
 * @param timestamp The response's timestamp.
 * @param errors The list of error messages.
 * @since 0.0.1
 */
public record InputExceptionResponse(
  int errorCode,

  Instant timestamp,

  List<FieldErrorDetail> errors
) {
}
