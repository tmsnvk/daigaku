package net.tamasnovak.services.country;

import org.springframework.stereotype.Component;

@Component
public final class CountryServiceConstants {
  final String COUNTRY_NOT_FOUND = "The request contained invalid data. Resubmit your application.";

  private CountryServiceConstants() {}
}
