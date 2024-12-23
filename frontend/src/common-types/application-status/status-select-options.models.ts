/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { ApplicationStatus, FinalDestinationStatus, InterviewStatus, OfferStatus, ResponseStatus } from '@common-types';

/**
 * Defines the properties of all {@link Application} status fields.
 */
export interface ApplicationStatusSelectOptions {
  /**
   * All {@link ApplicationStatus} objects.
   */
  applicationStatus: Array<ApplicationStatus> | undefined;

  /**
   * All {@link InterviewStatus} objects.
   */
  interviewStatus: Array<InterviewStatus> | undefined;

  /**
   * All {@link OfferStatus} objects.
   */
  offerStatus: Array<OfferStatus> | undefined;

  /**
   * All {@link ResponseStatus} objects.
   */
  responseStatus: Array<ResponseStatus> | undefined;

  /**
   * All {@link FinalDestinationStatus} objects.
   */
  finalDestinationStatus: Array<FinalDestinationStatus> | undefined;
}

/**
 * Defines the return properties of the {@link useGetAllSelectOptions} custom hook.
 */
export interface ApplicationOptions {
  /**
   * An object containing all select options for the application statuses.
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
