/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const createCommentSchema = z.object({
  comment: z
    .string()
    .nonempty({ message: TranslationKey.COMMENT_REQUIRED })
    .regex(/^(.|\s){15,1000}$/, {
      message: TranslationKey.COMMENT_REQUIRED,
    }),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
