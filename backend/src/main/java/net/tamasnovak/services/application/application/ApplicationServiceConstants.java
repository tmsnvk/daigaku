package net.tamasnovak.services.application.application;

import org.springframework.stereotype.Component;

@Component
public final class ApplicationServiceConstants {
  final String NO_APPLICATION_FOUND = "No application was found.";
  final String NO_PERMISSION_TO_VIEW_APPLICATION = "You have no permission to view this application.";

  ApplicationServiceConstants() {}
}
