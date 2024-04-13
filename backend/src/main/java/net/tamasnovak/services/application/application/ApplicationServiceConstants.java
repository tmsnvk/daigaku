package net.tamasnovak.services.application.application;

import org.springframework.stereotype.Component;

@Component
public final class ApplicationServiceConstants {
  final String NO_APPLICATION_FOUND = "No application was found.";
  final String NO_PERMISSION_AS_STUDENT = "You have no permission to view this application.";
  final String NO_PERMISSION_AS_MENTOR = "You have no permission to view this application as the student who submitted it is not yours.";

  ApplicationServiceConstants() {}
}
