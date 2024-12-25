/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormSetError } from 'react-hook-form';

/**
 * Defines the possible form options an unauthorised user can choose from on the application's home page.
 */
export enum FormType {
  LOGIN,
  REGISTER,
  RESET,
}

/**
 * Defines a form selection method.
 */
export interface SelectForm {
  readonly selectForm: (formType: FormType) => void;
}

/**
 * Defines the properties of a confirmation modal that is displayed after submitting a form.
 */
export interface ConfirmationModal {
  readonly showModal: () => void;
}

/**
 * Defines the `react-hook-form` properties of the three forms on the {@link Home} component.
 */
export interface UseFormHook<T extends FieldValues> {
  formState: {
    errors: FieldErrors<T>;
  };
  handleSubmit: UseFormHandleSubmit<T>;
  register: UseFormRegister<T>;
  setError: UseFormSetError<T>;
}

/**
 * Defines the {@link useActiveFormComponent} custom hook's return value properties.
 */
export interface ActiveFormComponent {
  /**
   * The currently selected {@link FormType}.
   */
  activeFormType: FormType;

  /**
   * The currently active form component's JSX.Element.
   */
  activeFormComponent: JSX.Element;
}
