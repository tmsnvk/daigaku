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
public enum InterviewStatus {
  INVITED,
  NO_INTERVIEW,
  NOT_INVITED;

  @JsonCreator
  public static InterviewStatus fromString(String value) {
    for (InterviewStatus status : InterviewStatus.values()) {
      if (status.name().equalsIgnoreCase(value)) {
        return status;
      }
    }

    throw new IllegalArgumentException(StatusMessages.INVALID_INTERVIEW_STATUS);
  }
}
