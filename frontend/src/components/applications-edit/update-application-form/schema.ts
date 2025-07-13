/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, constants imports */
import { TranslationKey } from '@daigaku/constants';

/* interface, type imports */
import {
  ApplicationStatus,
  ApplicationStatuses,
  FinalDestinationStatuses,
  InterviewStatuses,
  OfferStatuses,
  ResponseStatuses,
} from '@daigaku/common-types';

const nullableStatusField = <TStatusField>(validValues: Array<TStatusField>, errorMessage: string) =>
  z
    .string()
    .refine((value: string | null) => {
      return (
        value === null || validValues.includes(value as TStatusField),
        {
          error: errorMessage,
        }
      );
    })
    .nullable()
    .optional();

export const updateApplicationSchema = z.object({
  applicationStatus: z.string().refine((value: string) => {
    return (
      Object.values(ApplicationStatuses).includes(value as ApplicationStatus),
      {
        error: TranslationKey.VALID_APPLICATION_STATUS_REQUIRED,
      }
    );
  }),
  interviewStatus: nullableStatusField(
    Object.values(InterviewStatuses),
    TranslationKey.VALID_INTERVIEW_STATUS_REQUIRED,
  ),
  offerStatus: nullableStatusField(Object.values(OfferStatuses), TranslationKey.VALID_OFFER_STATUS_REQUIRED),
  responseStatus: nullableStatusField(Object.values(ResponseStatuses), TranslationKey.VALID_RESPONSE_STATUS_REQUIRED),
  finalDestinationStatus: nullableStatusField(
    Object.values(FinalDestinationStatuses),
    TranslationKey.VALID_FINAL_DESTINATION_STATUS_REQUIRED,
  ),
});

export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>;
