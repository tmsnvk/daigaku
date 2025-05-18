/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';
import { TranslationKey } from '@daigaku/constants';

export const formValidationSchema = z.object({
  comment: z
    .string()
    .nonempty({ message: TranslationKey.COMMENT_REQUIRED })
    .regex(/^(.|\s){15,1000}$/, {
      message: TranslationKey.COMMENT_REQUIRED,
    }),
});

export type FormInputValues = z.infer<typeof formValidationSchema>;
