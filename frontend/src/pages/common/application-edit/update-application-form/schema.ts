/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* interface, type, enum, schema imports */
import {
  ApplicationStatus,
  FinalDestinationStatus,
  InterviewStatus,
  OfferStatus,
  ResponseStatus,
} from '@daigaku/common-types';

export const updateApplicationFormValidationSchema = z.object({
  applicationStatus: z.nativeEnum(ApplicationStatus),
  interviewStatus: z.nativeEnum(InterviewStatus).optional().nullable(),
  offerStatus: z.nativeEnum(OfferStatus).optional().nullable(),
  responseStatus: z.nativeEnum(ResponseStatus).optional().nullable(),
  finalDestinationStatus: z.nativeEnum(FinalDestinationStatus).optional().nullable(),
});

export type FormInputValues = z.infer<typeof updateApplicationFormValidationSchema>;
