/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { ApplicationStatus, FinalDestinationStatus, InterviewStatus, OfferStatus, ResponseStatus } from './application-status.ts';

/**
 * Defines the properties of all application status fields.
 */
export interface ApplicationStatusSelectOptions {
  /**
   * All ApplicationStatus as select option objects.
   */
  applicationStatus: Array<ApplicationStatus> | undefined;

  /**
   * All InterviewStatus as select option objects.
   */
  interviewStatus: Array<InterviewStatus> | undefined;

  /**
   * All OfferStatus as select option objects.
   */
  offerStatus: Array<OfferStatus> | undefined;

  /**
   * All ResponseStatus as select option objects.
   */
  responseStatus: Array<ResponseStatus> | undefined;

  /**
   * All FinalDestinationStatus as select option objects.
   */
  finalDestinationStatus: Array<FinalDestinationStatus> | undefined;
}

/**
 * Defines the options and state for handling application status select fields.
 */
export interface ApplicationOptions {
  /**
   * An object containing all select options for all application status fields.
   */
  selectOptions: ApplicationStatusSelectOptions;

  /**
   * Indicates whether the queries are currently loading.
   */
  isLoading: boolean;

  /**
   * Indicates whether an error occurred during the queries.
   */
  isError: boolean;
}
