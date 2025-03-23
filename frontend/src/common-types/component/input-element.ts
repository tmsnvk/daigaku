/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FieldValues } from 'react-hook-form';

/* interface, type, enum imports */
import { InputStyleIntent } from './input-style-intent';
import { InputValidation } from './input-validation';

/**
 * Defines the properties of general-purpose input fields
 * that extend the {@link InputValidation} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
interface CoreFormElement<T extends FieldValues> extends InputValidation<T> {
  /**
   * The displayed label alongside the input element.
   */
  readonly label: string;

  /**
   * The initial value for the input element.
   */
  readonly initialValue?: string | number;

  /**
   * The placeholder text to guide the user on what to enter in the <input> element.
   */
  readonly placeholder: string;

  /**
   * The input element's style.
   */
  readonly intent: InputStyleIntent;
}

/**
 *
 */
export interface CommonInputElement<T extends FieldValues> extends CoreFormElement<T> {
  /**
   * The input element's type.
   */
  readonly type: string;
}

/**
 *
 */
export interface PasswordInputElement<T extends FieldValues> extends CoreFormElement<T> {}

/**
 *
 */
export interface CommonSelectElement<T extends FieldValues> extends CoreFormElement<T> {}
