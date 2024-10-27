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

/* external imports */
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormSetError } from 'react-hook-form';

/**
 * Defines the possible form options an unauthorised user can choose from.
 *
 * @since 0.0.1
 */
export enum FormType {
  LOGIN,
  REGISTER,
  RESET,
}

/**
 * Defines the {@link Home} page-component's form selection method.
 *
 * @since 0.0.1
 */
export interface SelectForm {
  readonly selectForm: (formType: FormType) => void;
}

/**
 * Defines the ConfirmationModal that is displayed after submitting either the {@link RegistrationForm} or {@link ResetForm} forms.
 *
 * @since 0.0.1
 */
export interface ConfirmationModal {
  readonly showModal: () => void;
}

/**
 * Defines the `react-hook-form` properties of the three forms on the {@link Home} component.
 *
 * @since 0.0.1
 */
export interface UseFormHook<T extends FieldValues> {
  formState: {
    errors: FieldErrors<T>;
  };
  handleSubmit: UseFormHandleSubmit<T>;
  register: UseFormRegister<T>;
  setError: UseFormSetError<T>;
}
