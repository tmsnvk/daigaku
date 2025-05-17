/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

/* interface, type, enum imports */
import { FormType } from './types.ts';

export const formTypeButtonLabel: Record<FormType, string> = {
  [FormType.LOGIN]: TranslationKey.LOGIN,
  [FormType.REGISTER_PENDING_ACCOUNT]: TranslationKey.PENDING_ACCOUNT_REGISTRATION,
  [FormType.RESET_ACCOUNT_PASSWORD]: TranslationKey.RESET_PASSWORD,
};
