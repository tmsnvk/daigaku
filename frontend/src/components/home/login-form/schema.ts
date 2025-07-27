/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

export const loginSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.input === '') {
        return 'application.page.root.loginForm.emailRequired';
      }

      return 'application.page.root.loginForm.validEmailRequired';
    },
  }),
  password: z.string().trim().nonempty({
    error: 'application.page.root.loginForm.passwordRequired',
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
