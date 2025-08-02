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
  [FormTypes.LOGIN]: 'app.page.root.selectorButtons.logIn',
  [FormTypes.REGISTER_PENDING_ACCOUNT]: 'app.page.root.selectorButtons.registerPendingAccount',
  [FormTypes.RESET_ACCOUNT_PASSWORD]: 'app.page.root.selectorButtons.resetPassword',
};
