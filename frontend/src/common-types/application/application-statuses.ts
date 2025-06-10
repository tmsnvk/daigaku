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
export const ApplicationStatuses = {
  PLANNED: 'PLANNED',
  SUBMITTED: 'SUBMITTED',
  WITHDRAWN: 'WITHDRAWN',
} as const;

export type ApplicationStatus = (typeof ApplicationStatuses)[keyof typeof ApplicationStatuses];

export const ApplicationStatusTranslations = {
  [ApplicationStatuses.PLANNED]: TranslationKey.APPLICATION_STATUS_PLANNED,
  [ApplicationStatuses.SUBMITTED]: TranslationKey.APPLICATION_STATUS_SUBMITTED,
  [ApplicationStatuses.WITHDRAWN]: TranslationKey.APPLICATION_STATUS_WITHDRAWN,
};

/**
 * Defines the possible values of the InterviewStatus field on an Application.
 */
export const InterviewStatuses = {
  INVITED: 'INVITED',
  NO_INTERVIEW: 'NO_INTERVIEW',
  NOT_INVITED: 'NOT_INVITED',
} as const;

export type InterviewStatus = (typeof InterviewStatuses)[keyof typeof InterviewStatuses];

export const InterviewStatusTranslations = {
  [InterviewStatuses.INVITED]: TranslationKey.INTERVIEW_STATUS_INVITED,
  [InterviewStatuses.NO_INTERVIEW]: TranslationKey.INTERVIEW_STATUS_NO_INTERVIEW,
  [InterviewStatuses.NOT_INVITED]: TranslationKey.INTERVIEW_STATUS_NOT_INVITED,
};

/**
 * Defines the possible values of the OfferStatus field on an Application.
 */
export const OfferStatuses = {
  CONDITIONAL: 'CONDITIONAL',
  DEFERRED: 'DEFERRED',
  REJECTED: 'REJECTED',
  UNCONDITIONAL: 'UNCONDITIONAL',
} as const;

export type OfferStatus = (typeof OfferStatuses)[keyof typeof OfferStatuses];

export const OfferStatusTranslations = {
  [OfferStatuses.CONDITIONAL]: TranslationKey.OFFER_STATUS_CONDITIONAL,
  [OfferStatuses.DEFERRED]: TranslationKey.OFFER_STATUS_DEFERRED,
  [OfferStatuses.REJECTED]: TranslationKey.OFFER_STATUS_REJECTED,
  [OfferStatuses.UNCONDITIONAL]: TranslationKey.OFFER_STATUS_UNCONDITIONAL,
};

/**
 * Defines the possible values of the ResponseStatus field on an Application.
 */
export const ResponseStatuses = {
  FIRM_CHOICE: 'FIRM_CHOICE',
  INSURANCE_CHOICE: 'INSURANCE_CHOICE',
  OFFER_DECLINED: 'OFFER_DECLINED',
} as const;

export type ResponseStatus = (typeof ResponseStatuses)[keyof typeof ResponseStatuses];

export const ResponseStatusTranslations = {
  [ResponseStatuses.FIRM_CHOICE]: TranslationKey.RESPONSE_STATUS_FIRM_CHOICE,
  [ResponseStatuses.INSURANCE_CHOICE]: TranslationKey.RESPONSE_STATUS_INSURANCE_CHOICE,
  [ResponseStatuses.OFFER_DECLINED]: TranslationKey.OFFER_STATUS_DEFERRED,
};

/**
 * Defines the possible values of the FinalDestination Status field on an Application.
 */
export const FinalDestinationStatuses = {
  FINAL_DESTINATION: 'FINAL_DESTINATION',
  DEFERRED_ENTRY: 'DEFERRED_ENTRY',
  NOT_FINAL_DESTINATION: 'NOT_FINAL_DESTINATION',
} as const;

export type FinalDestinationStatus = (typeof FinalDestinationStatuses)[keyof typeof FinalDestinationStatuses];

export const FinalDestinationStatusTranslations = {
  [FinalDestinationStatuses.FINAL_DESTINATION]: TranslationKey.FINAL_DESTINATION_STATUS_FINAL_DESTINATION,
  [FinalDestinationStatuses.DEFERRED_ENTRY]: TranslationKey.FINAL_DESTINATION_STATUS_DEFERRED_ENTRY,
  [FinalDestinationStatuses.NOT_FINAL_DESTINATION]: TranslationKey.FINAL_DESTINATION_STATUS_NOT_FINAL_DESTINATION,
};
