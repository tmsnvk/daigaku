/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions;

/**
 * Represents an input field validation error response object.
 *
 * @param fieldName The name of the form field the error is associated with. If the error is not associated with a given field but rather
 * handles a form error, this property should be set to 'root'.
 * @param errorMessage The error message.
 * @since 0.0.1
 */
public record FieldErrorDetail(
  String fieldName,

  String errorMessage
) {
}
