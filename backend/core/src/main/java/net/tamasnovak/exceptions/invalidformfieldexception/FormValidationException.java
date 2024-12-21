/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions.invalidformfieldexception;

/**
 * Custom exception that handles form validation errors.
 *
 * @since 0.0.1
 */
public class FormValidationException extends RuntimeException {
  public FormValidationException(String message) {
    super(message);
  }
}
