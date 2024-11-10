/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions;

/**
 * Represents a field validation error response object.
 *
 * @param fieldName The form field the error is associated with. If the error is not associated with a given field but rather handles a
 * form error, this property should be set to 'root'.
 * @param errorMessage The error message.
 * @since 0.0.1
 */
public record ErrorDetail(
  String fieldName,

  String errorMessage
) {
}
