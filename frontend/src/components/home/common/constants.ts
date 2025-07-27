/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, constants imports */
import { DotTranslationKey } from '@daigaku/constants';

/* interface, type imports */
import { FormType, FormTypes } from './types.ts';

export const formTypeButtonLabel: Record<FormType, DotTranslationKey> = {
  [FormTypes.LOGIN]: 'application.page.root.loginForm.logIn',
  [FormTypes.REGISTER_PENDING_ACCOUNT]: 'application.page.root.pendingAccountRegistrationForm.registerPendingAccount',
  [FormTypes.RESET_ACCOUNT_PASSWORD]: 'application.page.root.passwordResetForm.resetPassword',
};
