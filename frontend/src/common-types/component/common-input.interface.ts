/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { FieldValues } from 'react-hook-form';

/* interface, type, enum imports */
import { CoreInput } from './core-input.interface';

/**
 * Defines the properties of general-purpose inputs that extend the {@link CoreInput} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues} from the `react-hook-form` library.
 *
 * @since 0.0.1
 */

export interface CommonInput<T extends FieldValues> extends CoreInput<T> {
  /**
   * The label to be displayed alongside the input field.
   */
  label: string;

  /**
   * Optional input type, specifying the type of input.
   * Valid types include 'text', 'email', 'number', 'password', etc.
   */
  type?: string;

  /**
   * Optional placeholder text to guide the user on what to enter in the input field.
   */
  placeholder?: string;

  /**
   * Optional initial value for the input field.
   */
  initialValue?: string | number;
}
