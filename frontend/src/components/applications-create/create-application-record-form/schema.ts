/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const createApplicationSchema = z.object({
  countryUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return TranslationKey.COUNTRY_REQUIRED;
      }

      return TranslationKey.VALID_COUNTRY_REQUIRED;
    },
  }),
  universityUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return TranslationKey.UNIVERSITY_REQUIRED;
      }

      return TranslationKey.VALID_UNIVERSITY_REQUIRED;
    },
  }),
  courseName: z
    .string()
    .trim()
    .nonempty({ error: TranslationKey.COURSE_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: TranslationKey.COURSE_NAME_PATTERN,
    }),
  minorSubject: z
    .string()
    .trim()
    .optional()
    .refine((value) => value === undefined || value === '' || /^[\p{L}\s-]{5,255}$/u.test(value), {
      error: TranslationKey.MINOR_SUBJECT_PATTERN,
    }),
  programmeLength: z.coerce
    .number({ error: TranslationKey.PROGRAMME_LENGTH_REQUIRED })
    .min(1, { error: TranslationKey.PROGRAMME_LENGTH_PATTERN })
    .max(5, { error: TranslationKey.PROGRAMME_LENGTH_PATTERN }),
});

export type CreateApplicationSchema = z.infer<typeof createApplicationSchema>;
export type CreateApplicationSchemaFieldKey = keyof z.infer<typeof createApplicationSchema>;
