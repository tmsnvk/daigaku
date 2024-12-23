/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the properties of a single {@link Application} submission.
 */
export interface CreateApplicationFormFields {
  readonly countryUuid: string;
  readonly universityUuid: string;
  readonly courseName: string;
  readonly minorSubject: string;
  readonly programmeLength: number;
}

/**
 * Defines the properties of the form data fields.
 */
export interface UpdateApplicationFormFields {
  applicationStatusUuid: string | undefined;
  interviewStatusUuid: string | undefined;
  offerStatusUuid: string | undefined;
  responseStatusUuid: string | undefined;
  finalDestinationStatusUuid: string | undefined;
}
