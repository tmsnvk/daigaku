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
      error: 'application.page.root.pendingAccountRegistrationForm.firstNameRequired',
    })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: 'application.page.root.pendingAccountRegistrationForm.namePattern',
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({
      error: 'application.page.root.pendingAccountRegistrationForm.lastNameRequired',
    })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      error: 'application.page.root.pendingAccountRegistrationForm.namePattern',
    }),
  email: z.email({
    error: (issue) => {
      if (issue.input === '') {
        return 'application.page.root.pendingAccountRegistrationForm.emailRequired';
      }

      return 'application.page.root.pendingAccountRegistrationForm.validEmailRequired';
    },
  }),
  institutionUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return 'application.page.root.pendingAccountRegistrationForm.institutionRequired';
      }

      return 'application.page.root.pendingAccountRegistrationForm.validInstitutionRequired';
    },
  }),
  accountRoleUuid: z.uuidv4({
    error: (issue) => {
      if (issue.input === '') {
        return 'application.page.root.pendingAccountRegistrationForm.accountRoleRequired';
      }

      return 'application.page.root.pendingAccountRegistrationForm.validAccountRoleRequired';
    },
  }),
});

export type PendingAccountRegistrationSchema = z.infer<typeof pendingAccountRegistrationSchema>;
