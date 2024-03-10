package net.tamasnovak.exceptions;

public final class FormErrorException extends RuntimeException {
  public FormErrorException(String message) {
    super(message);
  }
}
