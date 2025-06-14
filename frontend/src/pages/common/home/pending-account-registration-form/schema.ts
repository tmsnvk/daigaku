/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const pendingAccountRegistrationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({ error: TranslationKey.FIRST_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: TranslationKey.NAME_PATTERN,
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({ error: TranslationKey.LAST_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: TranslationKey.NAME_PATTERN,
    }),
  email: z.email({ error: TranslationKey.EMAIL_REQUIRED }).nonempty({ error: TranslationKey.VALID_EMAIL_REQUIRED }),
  institutionUuid: z
    .uuidv4({ error: TranslationKey.VALID_INSTITUTION_REQUIRED })
    .nonempty({ error: TranslationKey.INSTITUTION_REQUIRED }),
  accountRoleUuid: z
    .uuidv4({ error: TranslationKey.VALID_ACCOUNT_ROLE_REQUIRED })
    .nonempty({ error: TranslationKey.ACCOUNT_ROLE_REQUIRED }),
});

export type PendingAccountRegistrationSchema = z.infer<typeof pendingAccountRegistrationSchema>;
export type PendingAccountRegistrationSchemaFieldKey = keyof z.infer<typeof pendingAccountRegistrationSchema>;
