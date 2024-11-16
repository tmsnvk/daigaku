/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.exceptions.invalidformfieldexception;

import org.springframework.stereotype.Component;

/**
 * Stores {@link InvalidFormFieldException} message constants.
 *
 * @since 0.0.1
 */
@Component
public class InvalidFormFieldExceptionMessages {
  public static final String MISSING_APPLICATION_STATUS = "The form submission should include an 'Application Status'.";
  public static final String FIRM_CHOICE_ERROR = "The application was not updated as you may only have one Response set to 'Firm Choice'.";
  public static final String FINAL_DESTINATION_ERROR =
    "The application was not updated as you may only have one Application set to 'Final Destination'.";

  private InvalidFormFieldExceptionMessages() {
    // Class should not be initialised.
  }
}
