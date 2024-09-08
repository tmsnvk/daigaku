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

export enum FormType {
  LOGIN,
  REGISTER,
  RESET,
}

export interface SelectForm {
  readonly selectForm: (formType: FormType) => void;
}

export interface ConfirmationModal {
  readonly showModal: () => void;
}

export interface UseFormHook<T extends FieldValues> {
  formState: {
    errors: FieldErrors<T>;
  };
  handleSubmit: UseFormHandleSubmit<T>;
  register: UseFormRegister<T>;
  setError: UseFormSetError<T>;
}
