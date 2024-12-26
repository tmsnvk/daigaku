/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.service;

import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.common.entity.Application;
import org.springframework.stereotype.Component;

/**
 * Stores {@link Student}-related {@link Application} entity service layer constants.
 */
@Component
public final class StudentApplicationServiceMessages {
  static final String UNIVERSITY_BELONGS_TO_DIFFERENT_COUNTRY =
    "Invalid country/university match is found. Resubmit your application with valid values.";

  private StudentApplicationServiceMessages() {
    // Class should not be initialised.
  }
}
