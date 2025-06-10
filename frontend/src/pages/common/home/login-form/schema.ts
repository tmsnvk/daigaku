/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const loginFormValidationSchema = z.object({
  email: z.string().email({ message: TranslationKey.EMAIL_REQUIRED }),
  password: z.string().trim().nonempty({ message: TranslationKey.PASSWORD_REQUIRED }),
});

export type LoginFormValidationSchema = z.infer<typeof loginFormValidationSchema>;
