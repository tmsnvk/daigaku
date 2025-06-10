/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

/**
 * Defines the possible values of the ApplicationStatus field on an Application.
 */
export const ApplicationStatus = {
  PLANNED: 'PLANNED',
  SUBMITTED: 'SUBMITTED',
  WITHDRAWN: 'WITHDRAWN',
} as const;

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export const ApplicationStatusTranslations = {
  [ApplicationStatus.PLANNED]: TranslationKey.APPLICATION_STATUS_PLANNED,
  [ApplicationStatus.SUBMITTED]: TranslationKey.APPLICATION_STATUS_SUBMITTED,
  [ApplicationStatus.WITHDRAWN]: TranslationKey.APPLICATION_STATUS_WITHDRAWN,
};

/**
 * Defines the possible values of the InterviewStatus field on an Application.
 */
export const InterviewStatus = {
  INVITED: 'INVITED',
  NO_INTERVIEW: 'NO_INTERVIEW',
  NOT_INVITED: 'NOT_INVITED',
} as const;

export type InterviewStatus = (typeof InterviewStatus)[keyof typeof InterviewStatus];

export const InterviewStatusTranslations = {
  [InterviewStatus.INVITED]: TranslationKey.INTERVIEW_STATUS_INVITED,
  [InterviewStatus.NO_INTERVIEW]: TranslationKey.INTERVIEW_STATUS_NO_INTERVIEW,
  [InterviewStatus.NOT_INVITED]: TranslationKey.INTERVIEW_STATUS_NOT_INVITED,
};

/**
 * Defines the possible values of the OfferStatus field on an Application.
 */
export const OfferStatus = {
  CONDITIONAL: 'CONDITIONAL',
  DEFERRED: 'DEFERRED',
  REJECTED: 'REJECTED',
  UNCONDITIONAL: 'UNCONDITIONAL',
} as const;

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus];

export const OfferStatusTranslations = {
  [OfferStatus.CONDITIONAL]: TranslationKey.OFFER_STATUS_CONDITIONAL,
  [OfferStatus.DEFERRED]: TranslationKey.OFFER_STATUS_DEFERRED,
  [OfferStatus.REJECTED]: TranslationKey.OFFER_STATUS_REJECTED,
  [OfferStatus.UNCONDITIONAL]: TranslationKey.OFFER_STATUS_UNCONDITIONAL,
};

/**
 * Defines the possible values of the ResponseStatus field on an Application.
 */
export const ResponseStatus = {
  FIRM_CHOICE: 'FIRM_CHOICE',
  INSURANCE_CHOICE: 'INSURANCE_CHOICE',
  OFFER_DECLINED: 'OFFER_DECLINED',
} as const;

export type ResponseStatus = (typeof ResponseStatus)[keyof typeof ResponseStatus];

export const ResponseStatusTranslations = {
  [ResponseStatus.FIRM_CHOICE]: TranslationKey.RESPONSE_STATUS_FIRM_CHOICE,
  [ResponseStatus.INSURANCE_CHOICE]: TranslationKey.RESPONSE_STATUS_INSURANCE_CHOICE,
  [ResponseStatus.OFFER_DECLINED]: TranslationKey.OFFER_STATUS_DEFERRED,
};

/**
 * Defines the possible values of the FinalDestination Status field on an Application.
 */
export const FinalDestinationStatus = {
  FINAL_DESTINATION: 'FINAL_DESTINATION',
  DEFERRED_ENTRY: 'DEFERRED_ENTRY',
  NOT_FINAL_DESTINATION: 'NOT_FINAL_DESTINATION',
} as const;

export type FinalDestinationStatus = (typeof FinalDestinationStatus)[keyof typeof FinalDestinationStatus];

export const FinalDestinationStatusTranslations = {
  [FinalDestinationStatus.FINAL_DESTINATION]: TranslationKey.FINAL_DESTINATION_STATUS_FINAL_DESTINATION,
  [FinalDestinationStatus.DEFERRED_ENTRY]: TranslationKey.FINAL_DESTINATION_STATUS_DEFERRED_ENTRY,
  [FinalDestinationStatus.NOT_FINAL_DESTINATION]: TranslationKey.FINAL_DESTINATION_STATUS_NOT_FINAL_DESTINATION,
};
