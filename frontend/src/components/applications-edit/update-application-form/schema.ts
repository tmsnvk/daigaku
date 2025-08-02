/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, constants imports */

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
        error: 'app.page.applicationEdit.form.validApplicationStatusRequired',
      }
    );
  }),
  interviewStatus: nullableStatusField(
    Object.values(InterviewStatuses),
    'app.page.applicationEdit.form.validInterviewStatusRequired',
  ),
  offerStatus: nullableStatusField(
    Object.values(OfferStatuses),
    'app.page.applicationEdit.form.validOfferStatusRequired',
  ),
  responseStatus: nullableStatusField(
    Object.values(ResponseStatuses),
    'app.page.applicationEdit.form.validResponseStatusRequired',
  ),
  finalDestinationStatus: nullableStatusField(
    Object.values(FinalDestinationStatuses),
    'app.page.applicationEdit.form.validFinalDestinationStatusRequired',
  ),
});

export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>;
