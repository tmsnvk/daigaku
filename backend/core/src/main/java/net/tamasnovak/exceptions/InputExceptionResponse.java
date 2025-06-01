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
 * @param httpStatusCodeValue The response's http status error code value.
 * @param httpStatusCodeName The response's http status error code name.
 * @param exceptionType The response's exception type.
 * @param timestamp The response's timestamp.
 * @param errors The list of error messages.
 */
public record InputExceptionResponse(
  int httpStatusCodeValue,

  String httpStatusCodeName,

  String exceptionType,

  Instant timestamp,

  List<FieldErrorDetail> errors
) {
}
