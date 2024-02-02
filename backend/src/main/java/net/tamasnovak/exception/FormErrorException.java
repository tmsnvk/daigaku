package net.tamasnovak.exception;

public final class FormErrorException extends RuntimeException {
  public FormErrorException(String message) {
    super(message);
  }
}
