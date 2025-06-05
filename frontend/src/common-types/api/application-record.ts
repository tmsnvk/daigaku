/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum, schema imports */
import { CoreMetadata } from '../core/core-metada.ts';
import {
  ApplicationStatus,
  FinalDestinationStatus,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
} from './application-record-status.ts';

/**
 * Defines the properties of an application-record.
 */
export interface ApplicationRecord extends CoreMetadata {
  /**
   * The application-record's uuid string.
   */
  readonly uuid: string;

  /**
   * The uuid string of the account associated with the application-record.
   */
  readonly accountUuid: string;

  /**
   * The application-record's country uuid string.
   */
  readonly country: string;

  /**
   * The application-record's university uuid string.
   */
  readonly university: string;

  /**
   * The application-record's course.
   */
  readonly courseName: string;

  /**
   * The application-record's minor course.
   */
  readonly minorSubject: string;

  /**
   * The application-record's programme length.
   */
  readonly programmeLength: number;

  /**
   * The application-record's current ApplicationStatus.
   */
  readonly applicationStatus: ApplicationStatus;

  /**
   * The application-record's current InterviewStatus.
   */
  readonly interviewStatus: InterviewStatus | null;

  /**
   * The application-record's current OfferStatus.
   */
  readonly offerStatus: OfferStatus | null;

  /**
   * The application-record's current ResponseStatus.
   */
  readonly responseStatus: ResponseStatus | null;

  /**
   * The application-record's current FinalDestinationStatus.
   */
  readonly finalDestinationStatus: FinalDestinationStatus | null;

  /**
   * The boolean indicating whether the owner marked the application-record obsolete and ready for deletion.
   */
  isRemovable: boolean;
}

/**
 * Defines the structure of a new application-record to be submitted by Student authenticated users.
 */
export interface CreateApplicationByStudentPayload {
  /**
   * The application-record's country uuid string.
   */
  readonly countryUuid: string;

  /**
   * The application-record's university uuid string.
   */
  readonly universityUuid: string;

  /**
   * The application-record's course name.
   */
  readonly courseName: string;

  /**
   * The application-record's minor course name.
   */
  readonly minorSubject: string;

  /**
   * The length of the application-record's course.
   */
  readonly programmeLength: number;
}

/**
 * Defines the structure of an application-record update to be submitted by Student authenticated users.
 */
export interface UpdateApplicationByStudentPayload {
  /**
   * The application-record's ApplicationStatus uuid string.
   */
  applicationStatusUuid: string | undefined;

  /**
   * The application-record's InterviewStatus uuid string.
   */
  interviewStatusUuid: string | undefined;

  /**
   * The application-record's OfferStatus uuid string.
   */
  offerStatusUuid: string | undefined;

  /**
   * The application-record's ResponseStatus uuid string.
   */
  responseStatusUuid: string | undefined;

  /**
   * The application-record's FinalDestination uuid string.
   */
  finalDestinationStatusUuid: string | undefined;
}
