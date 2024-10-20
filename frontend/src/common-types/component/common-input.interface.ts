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
 * Defines the properties of general purpose inputs, extending {@link CoreInput} properties.
 *
 * @since 0.0.1
 */

export interface CommonInput<T extends FieldValues> extends CoreInput<T> {
  /**
   * Input label.
   */
  label: string;

  /**
   * Optional input type, e.g. 'text', 'email', 'number', etc.
   */
  type?: string;

  /**
   * Optional input placeholder text.
   */
  placeholder?: string;

  /**
   * Optional initial value.
   */
  initialValue?: string | number;
}
