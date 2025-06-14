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
public enum OfferStatus {
  CONDITIONAL,
  DEFERRED,
  REJECTED,
  UNCONDITIONAL;

  @JsonCreator
  public static OfferStatus fromString(String value) {
    for (OfferStatus status : OfferStatus.values()) {
      if (status.name().equalsIgnoreCase(value)) {
        return status;
      }
    }

    throw new IllegalArgumentException(StatusMessages.INVALID_OFFER_STATUS);
  }
}
