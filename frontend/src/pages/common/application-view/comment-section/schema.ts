/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

export const createCommentSchema = z.object({
  comment: z
    .string()
    .nonempty({ error: TranslationKey.COMMENT_REQUIRED })
    .regex(/^(.|\s){15,1000}$/, {
      error: TranslationKey.COMMENT_PATTERN,
    }),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
export type CreateCommentSchemaFieldKey = keyof z.infer<typeof createCommentSchema>;
