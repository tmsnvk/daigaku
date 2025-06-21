/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const resetAccountPasswordSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.input === '') {
        return TranslationKey.EMAIL_REQUIRED;
      }

      return TranslationKey.VALID_EMAIL_REQUIRED;
    },
  }),
});

export type ResetAccountPasswordSchema = z.infer<typeof resetAccountPasswordSchema>;
export type ResetAccountPasswordSchemaFieldKey = keyof z.infer<typeof resetAccountPasswordSchema>;
