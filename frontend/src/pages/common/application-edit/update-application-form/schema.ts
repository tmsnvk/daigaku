/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

export const updateApplicationFormValidationSchema = z.object({
  applicationStatusUuid: z.string().uuid(),
  interviewStatusUuid: z.union([z.string().uuid(), z.literal('')]),
  offerStatusUuid: z.union([z.string().uuid(), z.literal('')]),
  responseStatusUuid: z.union([z.string().uuid(), z.literal('')]),
  finalDestinationStatusUuid: z.union([z.string().uuid(), z.literal('')]),
});

export type FormInputValues = z.infer<typeof updateApplicationFormValidationSchema>;
