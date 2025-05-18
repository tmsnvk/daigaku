/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const formValidationSchema = z.object({
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
  email: z.string().email({ message: TranslationKey.EMAIL_REQUIRED }),
  institutionUuid: z.string().uuid({ message: TranslationKey.INSTITUTION_REQUIRED }),
  accountRoleUuid: z.string().uuid({ message: TranslationKey.ACCOUNT_ROLE_REQUIRED }),
});

export type FormInputValues = z.infer<typeof formValidationSchema>;
