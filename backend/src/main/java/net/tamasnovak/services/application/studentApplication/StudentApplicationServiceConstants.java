package net.tamasnovak.services.application.studentApplication;

import org.springframework.stereotype.Component;

@Component
public final class StudentApplicationServiceConstants {
  final String NO_APPLICATION_FOUND = "No application was found.";
  final String NO_PERMISSION_AS_STUDENT = "You have no permission to view this application.";
  final String UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY = "The requested universityUuid belongs to a different countryUuid.";

  private StudentApplicationServiceConstants() {}
}
