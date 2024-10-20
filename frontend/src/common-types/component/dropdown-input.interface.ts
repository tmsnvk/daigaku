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
 * Defines the properties of a dropdown input, extending {@link CoreInput} properties.
 *
 * @template T - The type of form values, extending `react-hook-form` FieldValues.
 * @template U - The type of options available in the dropdown.
 *
 * @since 0.0.1
 */
export interface DropdownInput<T extends FieldValues, U> extends CoreInput<T> {
  /**
   *  An array of options available for selection in the dropdown.
   */
  options: Array<U>;
}
