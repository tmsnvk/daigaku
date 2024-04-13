package net.tamasnovak.services.country;

import org.springframework.stereotype.Component;

@Component
public final class CountryServiceConstants {
  final String COUNTRY_NOT_FOUND = "The requested country was not found in our database.";

  private CountryServiceConstants() {}
}
