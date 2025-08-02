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
      error: 'app.page.applicationView.comment.form.commentRequired',
    })
    .regex(/^(.|\s){15,1000}$/, {
      error: 'app.page.applicationView.comment.form.commentPattern',
    }),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
