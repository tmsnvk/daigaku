/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

export const createCommentSchema = z.object({
  comment: z
    .string()
    .nonempty({
      error: 'application.page.applicationView.commentRequired',
    })
    .regex(/^(.|\s){15,1000}$/, {
      error: 'application.page.applicationView.commentPattern',
    }),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
