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
public enum FinalDestinationStatus {
  FINAL_DESTINATION,
  DEFERRED_FINAL_DESTINATION,
  NOT_FINAL_DESTINATION;

  @JsonCreator
  public static FinalDestinationStatus fromString(String value) {
    for (FinalDestinationStatus status : FinalDestinationStatus.values()) {
      if (status.name().equalsIgnoreCase(value)) {
        return status;
      }
    }

    throw new IllegalArgumentException(StatusMessages.INVALID_FINAL_DESTINATION_STATUS);
  }
}
