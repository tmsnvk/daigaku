/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* interface, type imports */
import {
  ApplicationStatus,
  FinalDestinationStatus,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
} from '@daigaku/common-types';

export const updateApplicationFormValidationSchema = z.object({
  applicationStatus: z.nativeEnum(ApplicationStatus),
  interviewStatus: z
    .preprocess((value) => (value === '' ? null : value), z.nativeEnum(InterviewStatus).nullable())
    .optional(),
  offerStatus: z.preprocess((value) => (value === '' ? null : value), z.nativeEnum(OfferStatus).nullable()).optional(),
  responseStatus: z
    .preprocess((value) => (value === '' ? null : value), z.nativeEnum(ResponseStatus).nullable())
    .optional(),
  finalDestinationStatus: z
    .preprocess((value) => (value === '' ? null : value), z.nativeEnum(FinalDestinationStatus).nullable())
    .optional(),
});

export type UpdateApplicationFormValidationSchema = z.infer<typeof updateApplicationFormValidationSchema>;
