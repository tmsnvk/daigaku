/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* interface, type imports */
import {
  ApplicationStatuses,
  FinalDestinationStatuses,
  InterviewStatuses,
  OfferStatuses,
  ResponseStatuses,
} from '@daigaku/common-types';

export const updateApplicationFormValidationSchema = z.object({
  applicationStatus: z.nativeEnum(ApplicationStatuses),
  interviewStatus: z
    .preprocess((value) => (value === '' ? null : value), z.nativeEnum(InterviewStatuses).nullable())
    .optional(),
  offerStatus: z
    .preprocess((value) => (value === '' ? null : value), z.nativeEnum(OfferStatuses).nullable())
    .optional(),
  responseStatus: z
    .preprocess((value) => (value === '' ? null : value), z.nativeEnum(ResponseStatuses).nullable())
    .optional(),
  finalDestinationStatus: z
    .preprocess((value) => (value === '' ? null : value), z.nativeEnum(FinalDestinationStatuses).nullable())
    .optional(),
});

export type UpdateApplicationFormValidationSchema = z.infer<typeof updateApplicationFormValidationSchema>;
