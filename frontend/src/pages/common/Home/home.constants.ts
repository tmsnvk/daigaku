/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* interface, type, enum imports */
import { FormType } from './home.interfaces.ts';

export const confirmationModalFeedback: Record<FormType, string> = {
  [FormType.LOGIN]: '',
  [FormType.REGISTER]: 'Thank you for registering your account. You will soon receive an email with further details.',
  [FormType.RESET]: 'Your password has been reset. You will soon receive an email with further instructions.',
};

export const formTypeButtonLabel: Record<FormType, string> = {
  [FormType.LOGIN]: 'Log in',
  [FormType.REGISTER]: 'Create account',
  [FormType.RESET]: 'Forgot password?',
};
