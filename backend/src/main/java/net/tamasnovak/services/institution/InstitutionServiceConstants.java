package net.tamasnovak.services.institution;

import org.springframework.stereotype.Component;

@Component
public final class InstitutionServiceConstants {
  final String INSTITUTION_NOT_FOUND = "The requested institution is not found in our database.";

  private InstitutionServiceConstants() {}
}
