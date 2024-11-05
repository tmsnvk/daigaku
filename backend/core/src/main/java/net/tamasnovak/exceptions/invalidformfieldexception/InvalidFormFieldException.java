/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions.invalidformfieldexception;

/**
 * Custom exception to handle form field-related errors.
 *
 * @since 0.0.1
 */
public class InvalidFormFieldException extends RuntimeException {
  public InvalidFormFieldException(String message) {
    super(message);
  }
}
