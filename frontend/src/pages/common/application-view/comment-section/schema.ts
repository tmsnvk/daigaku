/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const createCommentFormValidationSchema = z.object({
  comment: z
    .string()
    .nonempty({ message: TranslationKey.COMMENT_REQUIRED })
    .regex(/^(.|\s){15,1000}$/, {
      message: TranslationKey.COMMENT_REQUIRED,
    }),
});

export type FormInputValues = z.infer<typeof createCommentFormValidationSchema>;
