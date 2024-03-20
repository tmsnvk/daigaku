package net.tamasnovak.exceptions.dbReourceNotFound;

import org.springframework.stereotype.Component;

@Component
public final class DbResourceNotFoundConstants {
  public final String COUNTRY_NOT_FOUND = "The requested country was not found in our database.";
  public final String UNIVERSITY_NOT_FOUND = "The requested university was not found in our database.";
  public final String USER_NOT_FOUND = "This email address is not registered in our database.";

  DbResourceNotFoundConstants() {}
}
