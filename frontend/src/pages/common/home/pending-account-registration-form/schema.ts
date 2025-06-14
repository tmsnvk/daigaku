/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const pendingAccountRegistrationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({ message: TranslationKey.FIRST_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: TranslationKey.NAME_PATTERN,
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({ message: TranslationKey.LAST_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: TranslationKey.NAME_PATTERN,
    }),
  email: z
    .string()
    .trim()
    .nonempty({ message: TranslationKey.EMAIL_REQUIRED })
    .email({ message: TranslationKey.VALID_EMAIL_REQUIRED }),
  institutionUuid: z
    .string()
    .nonempty({ message: TranslationKey.INSTITUTION_REQUIRED })
    .uuid({ message: TranslationKey.VALID_EMAIL_REQUIRED }),
  accountRoleUuid: z
    .string()
    .nonempty({ message: TranslationKey.ACCOUNT_ROLE_REQUIRED })
    .uuid({ message: TranslationKey.VALID_ACCOUNT_ROLE_REQUIRED }),
});

export type PendingAccountRegistrationSchema = z.infer<typeof pendingAccountRegistrationSchema>;
