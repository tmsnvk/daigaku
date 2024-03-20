package net.tamasnovak.exceptions.dbReourceNotFound;

public final class DbResourceNotFoundException extends RuntimeException {
  public DbResourceNotFoundException(String message) {
    super(message);
  }
}
