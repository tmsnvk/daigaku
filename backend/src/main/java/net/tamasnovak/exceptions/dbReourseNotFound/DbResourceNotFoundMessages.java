package net.tamasnovak.exceptions.dbReourseNotFound;

import org.springframework.stereotype.Component;

@Component
public final class DbResourceNotFoundMessages {
  public final String COUNTRY_NOT_FOUND = "The requested country was not found in our database.";
  public final String UNIVERSITY_NOT_FOUND = "The requested university was not found in our database.";

  public DbResourceNotFoundMessages() {}
}
