/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* interface, type, enum imports */
import { ApplicationStatusE, FinalDestinationStatusE, InterviewStatusE, OfferStatusE, ResponseStatusE } from './application-status.enum';

/**
 * Defines the details of a user's {@link Application}, including its status, associated account, and relevant timestamps.
 *
 * @since 0.0.1
 */
export interface Application {
  readonly uuid: string;
  readonly account: string;
  readonly country: string;
  readonly university: string;
  readonly courseName: string;
  readonly minorSubject: string;
  readonly programmeLength: number;
  readonly applicationStatus: ApplicationStatusE;
  readonly interviewStatus: InterviewStatusE;
  readonly offerStatus: OfferStatusE;
  readonly responseStatus: ResponseStatusE;
  readonly finalDestinationStatus: FinalDestinationStatusE;
  readonly createdAt: Date;
  readonly lastUpdatedAt: Date;
  readonly createdBy: string;
  readonly lastModifiedBy: string;
  isRemovable: boolean;
}
