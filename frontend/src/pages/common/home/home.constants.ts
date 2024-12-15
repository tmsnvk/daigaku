/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* interface, type, enum imports */
import { FormType } from './home.interfaces.ts';

/**
 * @since 0.0.1
 */
export const confirmationModalFeedback: Record<FormType, string> = {
  [FormType.LOGIN]: '',
  [FormType.REGISTER]: 'Thank you for registering your account. You will soon receive an email with further details.',
  [FormType.RESET]: 'Your password has been reset. You will soon receive an email with further instructions.',
};

/**
 * @since 0.0.1
 */
export const formTypeButtonLabel: Record<FormType, string> = {
  [FormType.LOGIN]: 'Log in',
  [FormType.REGISTER]: 'Create account',
  [FormType.RESET]: 'Forgot password?',
};
