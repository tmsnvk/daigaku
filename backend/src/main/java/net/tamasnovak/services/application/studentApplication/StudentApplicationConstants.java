package net.tamasnovak.services.application.studentApplication;

import org.springframework.stereotype.Component;

@Component
public final class StudentApplicationConstants {
  final String NO_PERMISSION_AS_STUDENT = "You have no permission to view this application.";
  final String UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY = "Invalid country/university match is found. Resubmit your application with valid values.";

  private StudentApplicationConstants() {}
}
