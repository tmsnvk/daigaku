package net.tamasnovak.exceptions.dbReourseNotFound;

public final class DbResourceNotFoundException extends RuntimeException {
  public DbResourceNotFoundException(String message) {
    super(message);
  }
}
