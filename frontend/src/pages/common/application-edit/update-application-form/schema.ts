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

export const updateApplicationSchema = z.object({
  applicationStatus: z.enum(Object.values(ApplicationStatuses) as [string, ...string[]]),
  interviewStatus: z.union([z.enum(Object.values(InterviewStatuses) as [string, ...string[]]), z.null()]).optional(),
  offerStatus: z.union([z.enum(Object.values(OfferStatuses) as [string, ...string[]]), z.null()]).optional(),
  responseStatus: z.union([z.enum(Object.values(ResponseStatuses) as [string, ...string[]]), z.null()]).optional(),
  finalDestinationStatus: z
    .union([z.enum(Object.values(FinalDestinationStatuses) as [string, ...string[]]), z.null()])
    .optional(),
});

export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>;
