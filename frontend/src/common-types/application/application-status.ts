/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { TranslationKey } from '@daigaku/constants';

/**
 * Defines the possible values of the ApplicationStatus field on an Application.
 */
export const ApplicationStatus = {
  PLANNED: TranslationKey.APPLICATION_STATUS_PLANNED,
  SUBMITTED: TranslationKey.APPLICATION_STATUS_SUBMITTED,
  WITHDRAWN: TranslationKey.APPLICATION_STATUS_WITHDRAWN,
} as const;

export type ApplicationStatusKey = keyof typeof ApplicationStatus;
export type ApplicationStatusValue = (typeof ApplicationStatus)[ApplicationStatusKey];

/**
 * Defines the possible values of the InterviewStatus field on an Application.
 */
export const InterviewStatus = {
  INVITED: TranslationKey.INTERVIEW_STATUS_INVITED,
  NO_INTERVIEW: TranslationKey.INTERVIEW_STATUS_NO_INTERVIEW,
  NOT_INVITED: TranslationKey.INTERVIEW_STATUS_NOT_INVITED,
} as const;

export type InterviewStatusKey = keyof typeof InterviewStatus;
export type InterviewStatusValue = (typeof InterviewStatus)[InterviewStatusKey];

/**
 * Defines the possible values of the OfferStatus field on an Application.
 */
export const OfferStatus = {
  CONDITIONAL: TranslationKey.OFFER_STATUS_CONDITIONAL,
  DEFERRED: TranslationKey.OFFER_STATUS_DEFERRED,
  REJECTED: TranslationKey.OFFER_STATUS_REJECTED,
  UNCONDITIONAL: TranslationKey.OFFER_STATUS_UNCONDITIONAL,
};

export type OfferStatusKey = keyof typeof OfferStatus;
export type OfferStatusValue = (typeof OfferStatus)[OfferStatusKey];

/**
 * Defines the possible values of the ResponseStatus field on an Application.
 */
export const ResponseStatus = {
  FIRM_CHOICE: TranslationKey.RESPONSE_STATUS_FIRM_CHOICE,
  INSURANCE_CHOICE: TranslationKey.RESPONSE_STATUS_INSURANCE_CHOICE,
  OFFER_DECLINED: TranslationKey.OFFER_STATUS_DEFERRED,
} as const;

export type ResponseStatusKey = keyof typeof ResponseStatus;
export type ResponseStatusValue = (typeof ResponseStatus)[ResponseStatusKey];

/**
 * Defines the possible values of the FinalDestination Status field on an Application.
 */
export const FinalDestinationStatus = {
  FINAL_DESTINATION: TranslationKey.FINAL_DESTINATION_STATUS_FINAL_DESTINATION,
  DEFERRED_ENTRY: TranslationKey.FINAL_DESTINATION_STATUS_DEFERRED_ENTRY,
  NOT_FINAL_DESTINATION: TranslationKey.FINAL_DESTINATION_STATUS_NOT_FINAL_DESTINATION,
} as const;

export type FinalDestinationStatusKey = keyof typeof FinalDestinationStatus;
export type FinalDestinationStatusValue = (typeof FinalDestinationStatus)[FinalDestinationStatusKey];
