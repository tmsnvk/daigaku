/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

export const accountPasswordResetSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.input === '') {
        return 'app.page.root.passwordReset.form.emailRequired';
      }

      return 'app.page.root.passwordReset.form.validEmailRequired';
    },
  }),
});

export type AccountPasswordResetSchema = z.infer<typeof accountPasswordResetSchema>;
