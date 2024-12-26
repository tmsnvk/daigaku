/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.service;

import net.tamasnovak.artifact.application.common.entity.Application;
import org.springframework.stereotype.Component;

/**
 * Stores {@link Application} entity service layer constants.
 */
@Component
public class ApplicationServiceMessages {
  static final String INVALID_UUID = "Invalid Application id was provided.";

  private ApplicationServiceMessages() {
    // Class should not be initialised.
  }
}
