/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions.invalidformfieldexception;

import org.springframework.stereotype.Component;

/**
 * Stores {@link FormValidationException} message constants.
 */
@Component
public class FormValidationExceptionMessages {
  public static final String MISSING_APPLICATION_STATUS = "The form submission should include an 'Application Status'.";
  public static final String FIRM_CHOICE_ERROR = "The application was not updated as you may only have one Response set to 'Firm Choice'.";
  public static final String FINAL_DESTINATION_ERROR =
    "The application was not updated as you may only have one Application set to 'Final Destination'.";
  public static final String INVALID_APPLICATION_STATUS = "Provide a valid Application Status value.";
  public static final String INVALID_INTERVIEW_STATUS =
    "Provide a valid Interview Status value.";
  public static final String INVALID_OFFER_STATUS =
    "Provide a valid Offer Status value.";
  public static final String INVALID_RESPONSE_STATUS =
    "Provide a valid Response Status value.";
  public static final String INVALID_FINAL_DESTINATION_STATUS =
    "Provide a valid Final Destination Status value.";

  private FormValidationExceptionMessages() {
    // Class should not be initialized.
  }
}
