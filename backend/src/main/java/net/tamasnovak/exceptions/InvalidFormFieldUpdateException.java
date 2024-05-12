package net.tamasnovak.exceptions;

public class InvalidFormFieldUpdateException extends RuntimeException {
  public InvalidFormFieldUpdateException(String message) {
    super(message);
  }
}
