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
import { BaseMetadata } from '../metadata/base-metada.models';

/**
 * Defines the details of a user's {@link Application}, including its status, associated account, and relevant timestamps.
 */
export interface Application extends BaseMetadata {
  readonly uuid: string;
  readonly account: string;
  readonly country: string;
  readonly university: string;
  readonly courseName: string;
  readonly minorSubject: string;
  readonly programmeLength: number;
  readonly applicationStatus: ApplicationStatus;
  readonly interviewStatus: InterviewStatus;
  readonly offerStatus: OfferStatus;
  readonly responseStatus: ResponseStatus;
  readonly finalDestinationStatus: FinalDestinationStatus;
  isRemovable: boolean;
}
