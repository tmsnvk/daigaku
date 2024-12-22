/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FieldValues } from 'react-hook-form';

/* interface, type, enum imports */
import { CoreInput } from './core-input.interface';

/**
 * Defines the properties of dropdown inputs
 * that extend the {@link CoreInput} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 * @template U - The type of options available in the dropdown.
 */
export interface DropdownInput<T extends FieldValues, U> extends CoreInput<T> {
  /**
   * An array of options available for selection in the dropdown.
   */
  options: Array<U>;
}
