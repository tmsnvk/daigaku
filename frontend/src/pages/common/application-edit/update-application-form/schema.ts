/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

/* interface, type imports */
import {
  ApplicationStatus,
  ApplicationStatuses,
  FinalDestinationStatus,
  FinalDestinationStatuses,
  InterviewStatus,
  InterviewStatuses,
  OfferStatus,
  OfferStatuses,
  ResponseStatus,
  ResponseStatuses,
} from '@daigaku/common-types';

export const updateApplicationSchema = z.object({
  applicationStatus: z
    .string()
    .nullish()
    .refine(
      (value) =>
        value === null ||
        value === undefined ||
        Object.values(ApplicationStatuses).includes(value as ApplicationStatus),
      {
        message: TranslationKey.VALID_APPLICATION_STATUS_REQUIRED,
      },
    )
    .transform((value) => value ?? null),
  interviewStatus: z
    .string()
    .nullish()
    .refine(
      (value) =>
        value === null || value === undefined || Object.values(InterviewStatuses).includes(value as InterviewStatus),
      {
        message: TranslationKey.VALID_INTERVIEW_STATUS_REQUIRED,
      },
    )
    .transform((value) => value ?? null)
    .optional(),
  offerStatus: z
    .string()
    .nullish()
    .refine(
      (value) => value === null || value === undefined || Object.values(OfferStatuses).includes(value as OfferStatus),
      {
        message: TranslationKey.VALID_OFFER_STATUS_REQUIRED,
      },
    )
    .transform((value) => value ?? null)
    .optional(),
  responseStatus: z
    .string()
    .nullish()
    .refine(
      (value) =>
        value === null || value === undefined || Object.values(ResponseStatuses).includes(value as ResponseStatus),
      {
        message: TranslationKey.VALID_RESPONSE_STATUS_REQUIRED,
      },
    )
    .transform((value) => value ?? null)
    .optional(),
  finalDestinationStatus: z
    .string()
    .nullish()
    .refine(
      (value) =>
        value === null ||
        value === undefined ||
        Object.values(FinalDestinationStatuses).includes(value as FinalDestinationStatus),
      {
        message: TranslationKey.VALID_FINAL_DESTINATION_STATUS_REQUIRED,
      },
    )
    .transform((value) => value ?? null)
    .optional(),
});

export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>;
export type UpdateApplicationSchemaFieldKey = keyof z.infer<typeof updateApplicationSchema>;
