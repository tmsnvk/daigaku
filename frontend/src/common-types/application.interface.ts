/**
 * @prettier
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
