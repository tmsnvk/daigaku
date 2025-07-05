/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type imports */
import { CoreMetadata } from '../api-core/core-metada.ts';
import {
  ApplicationStatus,
  FinalDestinationStatus,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
} from '../application/application-statuses.ts';

/**
 *
 */
interface CoreApplicationStatusFields {
  /**
   * The Application's ApplicationStatus status.
   */
  readonly applicationStatus: ApplicationStatus;

  /**
   * The Application's InterviewStatus status.
   */
  readonly interviewStatus: InterviewStatus | null;

  /**
   * The Application's OfferStatus status.
   */
  readonly offerStatus: OfferStatus | null;

  /**
   * The Application's ResponseStatus status.
   */
  readonly responseStatus: ResponseStatus | null;

  /**
   * The Application's FinalDestination status.
   */
  readonly finalDestinationStatus: FinalDestinationStatus | null;
}

/**
 * Defines the properties of an Application.
 */
export interface ApplicationResponse extends CoreMetadata, CoreApplicationStatusFields {
  /**
   * The Application's uuid string.
   */
  readonly uuid: string;

  /**
   * The uuid string of the account associated with the Application.
   */
  readonly accountUuid: string;

  /**
   * The Application's country string.
   */
  readonly country: string;

  /**
   * The Application's university string.
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
export interface UpdateApplicationByStudentPayload extends CoreApplicationStatusFields {}
