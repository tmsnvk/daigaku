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
        return 'application.page.root.passwordResetForm.emailRequired';
      }

      return 'application.page.root.passwordResetForm.validEmailRequired';
    },
  }),
});

export type AccountPasswordResetSchema = z.infer<typeof accountPasswordResetSchema>;
