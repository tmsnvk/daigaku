/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/**
 * Defines the possible form options an unauthorized user can choose from on the application's home page.
 */
export const FormType = {
  LOGIN: 'LOGIN',
  REGISTER_PENDING_ACCOUNT: 'REGISTER_PENDING_ACCOUNT',
  RESET_ACCOUNT_PASSWORD: 'RESET_ACCOUNT_PASSWORD',
} as const;

export type FormType = (typeof FormType)[keyof typeof FormType];
