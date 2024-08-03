package net.tamasnovak.domains.application.studentApplication.service;

import org.springframework.stereotype.Component;

@Component
public final class StudentApplicationServiceConstants {
  final String UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY = "Invalid country/university match is found. Resubmit your application with valid values.";

  private StudentApplicationServiceConstants() {}
}
