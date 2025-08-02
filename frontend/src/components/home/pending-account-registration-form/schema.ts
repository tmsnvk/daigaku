/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { z } from 'zod/v4';

export const pendingAccountRegistrationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({
      error: 'app.page.root.pendingAccountRegistration.form.firstNameRequired',
    })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: 'app.page.root.pendingAccountRegistration.form.namePattern',
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({
      error: 'app.page.root.pendingAccountRegistration.form.lastNameRequired',
    })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: 'app.page.root.pendingAccountRegistration.form.namePattern',
    }),
  email: z.email({
    error: (issue) => {
      if (issue.input === '') {
        return 'app.page.root.pendingAccountRegistration.form.emailRequired';
      }

      return 'app.page.root.pendingAccountRegistration.form.validEmailRequired';
    },
  }),
  institutionUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return 'app.page.root.pendingAccountRegistration.form.institutionRequired';
      }

      return 'app.page.root.pendingAccountRegistration.form.validInstitutionRequired';
    },
  }),
  accountRoleUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return 'app.page.root.pendingAccountRegistration.form.accountRoleRequired';
      }

      return 'app.page.root.pendingAccountRegistration.form.validAccountRoleRequired';
    },
  }),
});

export type PendingAccountRegistrationSchema = z.infer<typeof pendingAccountRegistrationSchema>;
