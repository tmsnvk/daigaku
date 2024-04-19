package net.tamasnovak.services.country;

import org.springframework.stereotype.Component;

@Component
public final class CountryConstants {
  final String COUNTRY_NOT_FOUND = "The request contained invalid data. Resubmit your application.";

  private CountryConstants() {}
}
