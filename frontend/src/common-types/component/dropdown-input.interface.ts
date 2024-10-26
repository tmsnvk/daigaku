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
import { FieldValues } from 'react-hook-form';

/* interface, type, enum imports */
import { CoreInput } from './core-input.interface';

/**
 * Defines the properties of dropdown inputs that extend the {@link CoreInput} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues} from the `react-hook-form` library.
 * @template U - The type of options available in the dropdown.
 *
 * @since 0.0.1
 */
export interface DropdownInput<T extends FieldValues, U> extends CoreInput<T> {
  /**
   * An array of options available for selection in the dropdown.
   */
  options: Array<U>;
}
