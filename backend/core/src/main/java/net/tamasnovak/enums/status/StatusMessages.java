package net.tamasnovak.enums.status;

import org.springframework.stereotype.Component;

/**
 *
 */
@Component
public final class StatusMessages {
  static final String INVALID_APPLICATION_STATUS = "Provide a valid Application Status.";
  static final String INVALID_INTERVIEW_STATUS =
    "Provide a valid Interview Status.";
  static final String INVALID_OFFER_STATUS =
    "Provide a valid Offer Status.";
  static final String INVALID_RESPONSE_STATUS =
    "Provide a valid Response Status.";
  static final String INVALID_FINAL_DESTINATION_STATUS =
    "Provide a valid Final Destination Status.";

  private StatusMessages() {
    // Class should not be initialised.
  }
}
