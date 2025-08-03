/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

export const createApplicationSchema = z.object({
  countryUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return 'app.page.applicationCreate.form.countryRequired';
      }

      return 'app.page.applicationCreate.form.validCountryRequired';
    },
  }),
  universityUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return 'app.page.applicationCreate.form.universityRequired';
      }

      return 'app.page.applicationCreate.form.validUniversityRequired';
    },
  }),
  courseName: z
    .string()
    .trim()
    .nonempty({ error: 'app.page.applicationCreate.form.courseNameRequired' })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: 'app.page.applicationCreate.form.courseNamePattern',
    }),
  minorSubject: z
    .string()
    .trim()
    .optional()
    .refine((value) => value === undefined || value === '' || /^[\p{L}\s-]{1,255}$/u.test(value), {
      error: 'app.page.applicationCreate.form.minorSubjectPattern',
    }),
  programmeLength: z.coerce
    .number({ error: 'app.page.applicationCreate.form.programmeLengthRequired' })
    .min(1, { error: 'app.page.applicationCreate.form.programmeLengthPattern' })
    .max(5, { error: 'app.page.applicationCreate.form.programmeLengthPattern' }),
});

export type CreateApplicationSchema = z.infer<typeof createApplicationSchema>;
