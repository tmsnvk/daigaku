/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { ApplicationStatus, BaseMetadata, FinalDestinationStatus, InterviewStatus, OfferStatus, ResponseStatus } from '@common-types';

/**
 * Defines the details of an application, including its status, associated account, and relevant metadata.
 */
export interface Application extends BaseMetadata {
  /**
   * The application's uuid string.
   */
  readonly uuid: string;

  /**
   * The uuid string of the account associated with the Application.
   */
  readonly account: string;

  /**
   * The uuid string of the country associated with the Application.
   */
  readonly country: string;

  /**
   * The uuid string of the university associated with the Application.
   */
  readonly university: string;

  /**
   * The course associated with the Application.
   */
  readonly courseName: string;

  /**
   * The minor subject associated with the Application.
   */
  readonly minorSubject: string;

  /**
   * The programme length associated with the Application.
   */
  readonly programmeLength: number;

  /**
   * The Application's current ApplicationStatus.
   */
  readonly applicationStatus: ApplicationStatus;

  /**
   * The Application's current InterviewStatus.
   */
  readonly interviewStatus: InterviewStatus | null;

  /**
   * The Application's current OfferStatus.
   */
  readonly offerStatus: OfferStatus | null;

  /**
   * The Application's current ResponseStatus.
   */
  readonly responseStatus: ResponseStatus | null;

  /**
   * The Application's current FinalDestinationStatus.
   */
  readonly finalDestinationStatus: FinalDestinationStatus | null;

  /**
   * The boolean indicates whether the owner marked it obsolete and ready for deletion.
   */
  isRemovable: boolean;
}

/**
 * Defines the properties of a single new Application submission for Student authenticated users.
 */
export interface CreateApplicationByStudent {
  /**
   * The application's country uuid string.
   */
  readonly countryUuid: string;

  /**
   * The application's university uuid string.
   */
  readonly universityUuid: string;

  /**
   * The application's course name.
   */
  readonly courseName: string;

  /**
   * The application's minor course name.
   */
  readonly minorSubject: string;

  /**
   * The length of the application's course.
   */
  readonly programmeLength: number;
}

/**
 * Defines the properties of the form data fields.
 */
export interface UpdateApplicationByStudent {
  /**
   * The application's ApplicationStatus uuid string, if any.
   */
  applicationStatusUuid: string | undefined;

  /**
   * The application's InterviewStatus uuid string, if any.
   */
  interviewStatusUuid: string | undefined;

  /**
   * The application's OfferStatus uuid string, if any.
   */
  offerStatusUuid: string | undefined;

  /**
   * The application's ResponseStatu uuid string, if any.
   */
  responseStatusUuid: string | undefined;

  /**
   * The application's FinalDestination uuid string, if any.
   */
  finalDestinationStatusUuid: string | undefined;
}
