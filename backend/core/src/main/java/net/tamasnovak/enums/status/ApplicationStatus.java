/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.enums.status;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 *
 */
public enum ApplicationStatus {
  PLANNED,
  SUBMITTED,
  WITHDRAWN;

  @JsonCreator
  public static ApplicationStatus fromString(String value) {
    for (ApplicationStatus status : ApplicationStatus.values()) {
      if (status.name().equalsIgnoreCase(value)) {
        return status;
      }
    }

    throw new IllegalArgumentException(StatusMessages.INVALID_APPLICATION_STATUS);
  }
}
