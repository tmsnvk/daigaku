/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions.invalidformfieldexception;

/**
 * Custom exception that handles form field-related errors.
 *
 * @since 0.0.1
 */
public class InvalidFormFieldException extends RuntimeException {
  public InvalidFormFieldException(String message) {
    super(message);
  }
}
