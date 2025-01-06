/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the possible values of the Application Status field on an Application record.
 */
export enum ApplicationStatusE {
  PLANNED = 'Planned',
  SUBMITTED = 'Submitted',
  WITHDRAWN = 'Withdrawn',
}

/**
 * Defines the possible values of the Interview Status field on an Application record.
 */
export enum InterviewStatusE {
  INVITED = 'Invited',
  NO_INTERVIEW = 'No Interview',
  NOT_INVITED = 'Not Invited',
}

/**
 * Defines the possible values of the Offer Status field on an Application record.
 */
export enum OfferStatusE {
  CONDITIONAL = 'Conditional',
  DEFERRED = 'Deferred',
  REJECTED = 'Rejected',
  UNCONDITIONAL = 'Unconditional',
}

/**
 * Defines the possible values of the Response Status field on an Application record.
 */
export enum ResponseStatusE {
  FIRM_CHOICE = 'Firm Choice',
  INSURANCE_CHOICE = 'Insurance Choice',
  OFFER_DECLINED = 'Offer Declined',
}

/**
 * Defines the possible values of the Final Destination Status field on an Application record.
 */
export enum FinalDestinationStatusE {
  FINAL_DESTINATION = 'Final Destination',
  DEFERRED_ENTRY = 'Final Destination (Deferred Entry)',
  NOT_FINAL_DESTINATION = 'Not Final Destination',
}
