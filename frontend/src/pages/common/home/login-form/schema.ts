/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const loginSchema = z.object({
  email: z.email({ error: TranslationKey.EMAIL_REQUIRED }).nonempty({ error: TranslationKey.VALID_EMAIL_REQUIRED }),
  password: z.string().trim().nonempty({ error: TranslationKey.PASSWORD_REQUIRED }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginSchemaFieldKey = keyof z.infer<typeof loginSchema>;
