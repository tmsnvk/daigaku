/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the base properties of an application-record status field.
 */
interface BaseStatus {
  /**
   * The status's uuid string.
   */
  readonly uuid: string;

  /**
   * The status's name.
   */
  readonly name: string;
}

/**
 * Defines the properties of an application status option.
 */
export interface ApplicationStatus extends BaseStatus {}

/**
 * Defines the properties of an interview status option.
 */
export interface InterviewStatus extends BaseStatus {}

/**
 * Defines the properties of an offer status option.
 */
export interface OfferStatus extends BaseStatus {}

/**
 * Defines the properties of a response status option.
 */
export interface ResponseStatus extends BaseStatus {}

/**
 * Defines the properties of a final destination status option.
 */
export interface FinalDestinationStatus extends BaseStatus {}

/**
 * Defines a union type of all status options.
 */
export type ApplicationRecordStatusUnion =
  | ApplicationStatus
  | InterviewStatus
  | OfferStatus
  | ResponseStatus
  | FinalDestinationStatus;

/**
 * Defines the properties of all application-record status fields.
 */
export interface ApplicationRecordStatusOptions {
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
export interface ApplicationRecordStatusOptionsResponse {
  /**
   * An object containing all select options for all application status fields.
   */
  selectOptions: ApplicationRecordStatusOptions;

  /**
   * Indicates whether the queries are currently loading.
   */
  isLoading: boolean;

  /**
   * Indicates whether an error occurred during the queries.
   */
  isError: boolean;

  /**
   *
   */
  refetch: {
    applicationStatus: () => void;
    interviewStatus: () => void;
    offerStatus: () => void;
    responseStatus: () => void;
    finalDestinationStatus: () => void;
  };
}
