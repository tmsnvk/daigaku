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
public enum ResponseStatus {
  FIRM_CHOICE,
  INSURANCE_CHOICE,
  OFFER_DECLINED;

  @JsonCreator
  public static ResponseStatus fromString(String value) {
    for (ResponseStatus status : ResponseStatus.values()) {
      if (status.name().equalsIgnoreCase(value)) {
        return status;
      }
    }

    throw new IllegalArgumentException(StatusMessages.INVALID_RESPONSE_STATUS);
  }
}
