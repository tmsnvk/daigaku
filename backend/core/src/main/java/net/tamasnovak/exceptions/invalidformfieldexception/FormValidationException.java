/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions.invalidformfieldexception;

/**
 * Custom exception that handles form validation errors.
 */
public class FormValidationException extends RuntimeException {
  public FormValidationException(String message) {
    super(message);
  }
}
