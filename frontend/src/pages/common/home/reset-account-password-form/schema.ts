/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const resetAccountPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: TranslationKey.EMAIL_REQUIRED })
    .email({ message: TranslationKey.VALID_EMAIL_REQUIRED }),
});

export type ResetAccountPasswordSchema = z.infer<typeof resetAccountPasswordSchema>;
