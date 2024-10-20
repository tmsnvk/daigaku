/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/**
 * Defines the possible values of the Application Status field of an {@link Application}.
 *
 * @since 0.0.1
 */
export enum ApplicationStatus {
  PLANNED = 'Planned',
  SUBMITTED = 'Submitted',
  WITHDRAWN = 'Withdrawn',
}

/**
 * Defines the possible values of the Interview Status field of an {@link Application}.
 *
 * @since 0.0.1
 */
export enum InterviewStatus {
  INVITED = 'Invited',
  NO_INTERVIEW = 'No Interview',
  NOT_INVITED = 'Not Invited',
}

/**
 * Defines the possible values of the Offer Status field of an {@link Application}.
 *
 * @since 0.0.1
 */
export enum OfferStatus {
  CONDITIONAL = 'Conditional',
  DEFERRED = 'Deferred',
  REJECTED = 'Rejected',
  UNCONDITIONAL = 'Unconditional',
}

/**
 * Defines the possible values of the Response Status field of an {@link Application}.
 *
 * @since 0.0.1
 */
export enum ResponseStatus {
  FIRM_CHOICE = 'Firm Choice',
  INSURANCE_CHOICE = 'Insurance Choice',
  OFFER_DECLINED = 'Offer Declined',
}

/**
 * Defines the possible values of the Final Destination Status field of an {@link Application}.
 *
 * @since 0.0.1
 */
export enum FinalDestinationStatus {
  FINAL_DESTINATION = 'Final Destination',
  DEFERRED_ENTRY = 'Final Destination (Deferred Entry)',
  NOT_FINAL_DESTINATION = 'Not Final Destination',
}
