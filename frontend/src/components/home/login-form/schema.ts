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
        return 'app.page.root.login.form.emailRequired';
      }

      return 'app.page.root.login.form.validEmailRequired';
    },
  }),
  password: z.string().trim().nonempty({
    error: 'app.page.root.login.form.passwordRequired',
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
