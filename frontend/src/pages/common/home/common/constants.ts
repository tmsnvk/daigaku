/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

/* interface, type imports */
import { FormType, FormTypes } from './types.ts';

export const formTypeButtonLabel: Record<FormType, string> = {
  [FormTypes.LOGIN]: TranslationKey.LOGIN,
  [FormTypes.REGISTER_PENDING_ACCOUNT]: TranslationKey.PENDING_ACCOUNT_REGISTRATION,
  [FormTypes.RESET_ACCOUNT_PASSWORD]: TranslationKey.RESET_PASSWORD,
};
