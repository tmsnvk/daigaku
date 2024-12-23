/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the base of an {@link Application} status field.
 */
export interface BaseStatus {
  /**
   * The status's uuid.
   */
  readonly uuid: string;

  /**
   * The status's name.
   */
  readonly name: string;
}

/**
 * Defines an application status option object.
 */
export interface ApplicationStatus extends BaseStatus {}

/**
 * Defines an interview status option object.
 */
export interface InterviewStatus extends BaseStatus {}

/**
 * Defines an offer status option object.
 */
export interface OfferStatus extends BaseStatus {}

/**
 * Defines a response status option object.
 */
export interface ResponseStatus extends BaseStatus {}

/**
 * Defines a final destination status option object.
 */
export interface FinalDestinationStatus extends BaseStatus {}

/**
 * Defines a union tpye of all status options.
 */
export type ApplicationStatusUnion = ApplicationStatus | InterviewStatus | OfferStatus | ResponseStatus | FinalDestinationStatus;
