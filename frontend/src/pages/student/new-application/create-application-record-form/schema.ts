/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const createApplicationFormValidationSchema = z.object({
  countryUuid: z.string().uuid({ message: TranslationKey.COUNTRY_REQUIRED }),
  universityUuid: z.string().uuid({ message: TranslationKey.UNIVERSITY_REQUIRED }),
  courseName: z
    .string()
    .trim()
    .nonempty({ message: TranslationKey.COURSE_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: TranslationKey.COURSE_NAME_REQUIRED,
    }),
  minorSubject: z.string().trim().max(255, { message: TranslationKey.MINOR_SUBJECT_PATTERN }),
  programmeLength: z
    .number({ required_error: TranslationKey.PROGRAMME_LENGTH_REQUIRED })
    .min(1, { message: TranslationKey.PROGRAMME_LENGTH_PATTERN })
    .max(5, { message: TranslationKey.PROGRAMME_LENGTH_PATTERN }),
});

export type CreateApplicationFormValidationSchema = z.infer<typeof createApplicationFormValidationSchema>;
