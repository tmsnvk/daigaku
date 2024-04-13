package net.tamasnovak.services.university;

import org.springframework.stereotype.Component;

@Component
public final class UniversityServiceConstants {
  final String UNIVERSITY_NOT_FOUND = "The requested university was not found in our database.";

  private UniversityServiceConstants() {}
}
