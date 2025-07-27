/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, constants imports */

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
  [ApplicationStatuses.PLANNED]: 'application.domain.application.applicationStatusPlanned',
  [ApplicationStatuses.SUBMITTED]: 'application.domain.application.applicationStatusSubmitted',
  [ApplicationStatuses.WITHDRAWN]: 'application.domain.application.applicationStatusWithdrawn',
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
  [InterviewStatuses.INVITED]: 'application.domain.application.interviewStatusInvited',
  [InterviewStatuses.NO_INTERVIEW]: 'application.domain.application.interviewStatusNoInterview',
  [InterviewStatuses.NOT_INVITED]: 'application.domain.application.interviewStatusNotInvited',
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
  [OfferStatuses.CONDITIONAL]: 'application.domain.application.offerStatusConditional',
  [OfferStatuses.DEFERRED]: 'application.domain.application.offerStatusDeferred',
  [OfferStatuses.REJECTED]: 'application.domain.application.offerStatusRejected',
  [OfferStatuses.UNCONDITIONAL]: 'application.domain.application.offerStatusUnconditional',
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
  [ResponseStatuses.FIRM_CHOICE]: 'application.domain.application.responseStatusFirmChoice',
  [ResponseStatuses.INSURANCE_CHOICE]: 'application.domain.application.responseStatusInsuranceChoice',
  [ResponseStatuses.OFFER_DECLINED]: 'application.domain.application.offerStatusOfferDeclined',
};

/**
 * Defines the possible values of the FinalDestination Status field on an Application.
 */
export const FinalDestinationStatuses = {
  FINAL_DESTINATION: 'FINAL_DESTINATION',
  DEFERRED_FINAL_DESTINATION: 'DEFERRED_FINAL_DESTINATION',
  NOT_FINAL_DESTINATION: 'NOT_FINAL_DESTINATION',
} as const;

export type FinalDestinationStatus = (typeof FinalDestinationStatuses)[keyof typeof FinalDestinationStatuses];

export const FinalDestinationStatusTranslations = {
  [FinalDestinationStatuses.FINAL_DESTINATION]: 'application.domain.application.finalDestinationStatusFinalDestination',
  [FinalDestinationStatuses.DEFERRED_FINAL_DESTINATION]:
    'application.domain.application.finalDestinationStatusDeferredEntry',
  [FinalDestinationStatuses.NOT_FINAL_DESTINATION]:
    'application.domain.application.finalDestinationStatusNotFinalDestination',
};
