/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import {
  ApplicationStatuses,
  FinalDestinationStatuses,
  InterviewStatuses,
  OfferStatuses,
  ResponseStatuses,
} from '../application/application-statuses.ts';
import { CoreMetadata } from '../core/core-metada.ts';

/**
 * Defines the properties of an Application.
 */
export interface Application extends CoreMetadata {
  /**
   * The Application's uuid string.
   */
  readonly uuid: string;

  /**
   * The uuid string of the account associated with the Application.
   */
  readonly accountUuid: string;

  /**
   * The Application's country uuid string.
   */
  readonly country: string;

  /**
   * The Application's university uuid string.
   */
  readonly university: string;

  /**
   * The Application's course.
   */
  readonly courseName: string;

  /**
   * The Application's minor course.
   */
  readonly minorSubject: string;

  /**
   * The Application's programme length.
   */
  readonly programmeLength: number;

  /**
   * The Application's current ApplicationStatus.
   */
  readonly applicationStatus: ApplicationStatuses;

  /**
   * The Application's current InterviewStatus.
   */
  readonly interviewStatus: InterviewStatuses | null;

  /**
   * The Application's current OfferStatus.
   */
  readonly offerStatus: OfferStatuses | null;

  /**
   * The Application's current ResponseStatus.
   */
  readonly responseStatus: ResponseStatuses | null;

  /**
   * The Application's current FinalDestinationStatus.
   */
  readonly finalDestinationStatus: FinalDestinationStatuses | null;

  /**
   * The boolean indicating whether the owner marked the Application obsolete and ready for deletion.
   */
  isRemovable: boolean;
}

/**
 * Defines the structure of a new Application to be submitted by Student authenticated users.
 */
export interface CreateApplicationByStudentPayload {
  /**
   * The Application's country uuid string.
   */
  readonly countryUuid: string;

  /**
   * The Application's university uuid string.
   */
  readonly universityUuid: string;

  /**
   * The Application's course name.
   */
  readonly courseName: string;

  /**
   * The Application's minor course name.
   */
  readonly minorSubject: string;

  /**
   * The length of the Application's course.
   */
  readonly programmeLength: number;
}

/**
 * Defines the structure of an Application update to be submitted by Student authenticated users.
 */
export interface UpdateApplicationByStudentPayload {
  /**
   * The Application's ApplicationStatus status.
   */
  applicationStatus: ApplicationStatuses;

  /**
   * The Application's InterviewStatus status.
   */
  interviewStatus: InterviewStatuses | null;

  /**
   * The Application's OfferStatus status.
   */
  offerStatus: OfferStatuses | null;

  /**
   * The Application's ResponseStatus status.
   */
  responseStatus: ResponseStatuses | null;

  /**
   * The Application's FinalDestination status.
   */
  finalDestinationStatus: FinalDestinationStatuses | null;
}
