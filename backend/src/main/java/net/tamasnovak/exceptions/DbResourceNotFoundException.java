package net.tamasnovak.exceptions;

public final class DbResourceNotFoundException extends RuntimeException {
  public DbResourceNotFoundException(String message) {
    super(message);
  }
}
