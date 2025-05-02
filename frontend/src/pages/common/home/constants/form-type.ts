/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';

/* interface, type, enum imports */
import { FormType } from '../models';

export const confirmationModalFeedback: Partial<Record<FormType, string>> = {
  [FormType.REGISTER_PENDING_ACCOUNT]: TranslationKey.PENDING_ACCOUNT_REGISTRATION_MODAL,
  [FormType.RESET_ACCOUNT_PASSWORD]: TranslationKey.RESET_PASSWORD_MODAL,
};

export const formTypeButtonLabel: Record<FormType, string> = {
  [FormType.LOGIN]: TranslationKey.LOGIN,
  [FormType.REGISTER_PENDING_ACCOUNT]: TranslationKey.PENDING_ACCOUNT_REGISTRATION,
  [FormType.RESET_ACCOUNT_PASSWORD]: TranslationKey.RESET_PASSWORD,
};
