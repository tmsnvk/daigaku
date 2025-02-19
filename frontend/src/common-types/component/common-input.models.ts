/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FieldValues } from 'react-hook-form';

/* interface, type, enum imports */
import { CoreInput } from './core-input.models';

/**
 * Defines the properties of general-purpose input fields
 * that extend the {@link CoreInput} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */

export interface CommonInput<T extends FieldValues> extends CoreInput<T> {
  /**
   * The label to be displayed alongside the input field.
   */
  readonly label: string;

  /**
   * Optional input type, specifying the type of input.
   */
  readonly type?: string;

  /**
   * Optional placeholder text to guide the user on what to enter in the input field.
   */
  readonly placeholder?: string;

  /**
   * Optional initial value for the input field.
   */
  readonly initialValue?: string | number;
}
