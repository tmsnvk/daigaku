/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const resetAccountPasswordFormValidationSchema = z.object({
  email: z.string().email({ message: TranslationKey.EMAIL_REQUIRED }),
});

export type FormInputValues = z.infer<typeof resetAccountPasswordFormValidationSchema>;
