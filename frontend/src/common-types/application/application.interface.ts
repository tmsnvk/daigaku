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

/**
 * The interface represents the details of a user's application, including its status, associated account, and relevant timestamps.
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
  readonly applicationStatus: string;
  readonly interviewStatus: string;
  readonly offerStatus: string;
  readonly responseStatus: string;
  readonly finalDestinationStatus: string;
  readonly createdAt: Date;
  readonly lastUpdatedAt: Date;
  readonly createdBy: string;
  readonly lastModifiedBy: string;
  isRemovable: boolean;
}
