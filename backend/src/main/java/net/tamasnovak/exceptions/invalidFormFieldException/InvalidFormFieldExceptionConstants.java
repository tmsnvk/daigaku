package net.tamasnovak.exceptions.invalidFormFieldException;

import org.springframework.stereotype.Component;

@Component
public class InvalidFormFieldExceptionConstants {
  public static final String GENERIC_ERROR = "The application is not updated as the submitted data contained invalid field values.";
  public static final String MISSING_APPLICATION_STATUS = "The form submission should include an 'Application Status'.";
  public static final String PLANNED_ERROR = "The application is not updated as Application Status is already set to 'Planned'.";
  public static final String WITHDRAWN_ERROR = "The application is not updated as Application Status is already set to 'Withdrawn'.";
  public static final String NOT_INVITED_ERROR = "The application is not updated as Interview Status is already set to 'Not Invited'.";
  public static final String REJECTED_ERROR = "The application is not updated as Offer Status is already set to 'Rejected'.";
  public static final String DECLINED_ERROR = "The application is not updated as Response Status is already set to 'Offer Declined'.";
  public static final String FIRM_CHOICE_ERROR = "The application is not updated as you may only have one Response set to 'Firm Choice'.";
  public static final String FINAL_DESTINATION_ERROR = "The application is not updated as you may only have one Application set to 'Final Destination'.";

  private InvalidFormFieldExceptionConstants() {}
}
