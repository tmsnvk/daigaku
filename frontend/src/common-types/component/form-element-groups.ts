/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FieldValues } from 'react-hook-form';

/* interface, type, enum imports */
import { CoreFormElementValidation } from './core-form-element-validation';
import { CoreInputElementStyleIntent, CoreSelectElementStyleIntent, CoreTextareaElementStyleIntent } from './form-element-style-intents';

/**
 * Defines the properties of core form elements
 * that extend the {@link CoreFormElementValidation} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
interface CoreFormElementGroup<T extends FieldValues> extends CoreFormElementValidation<T> {
  /**
   * The initial value for the input element.
   */
  readonly initialValue?: string | number;

  /**
   * The input element's style intent.
   */
  readonly intent: CoreInputElementStyleIntent | CoreSelectElementStyleIntent | CoreTextareaElementStyleIntent;
}

/**
 * Defines the properties of input form elements
 * that extend the {@link CoreFormElementValidation} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
interface CoreInputElementGroup<T extends FieldValues> extends CoreFormElementGroup<T> {
  /**
   * The displayed label alongside the input element.
   */
  readonly label: string;

  /**
   * Placeholder text to guide the user on what to enter in the input element.
   * Optional, since certain input elements might have pre-filled data.
   */
  readonly placeholder?: string;
}

/**
 * Defines the properties of general-purpose input form elements
 * that extend the {@link CoreFormElementValidation} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
export interface CommonInputElementGroup<T extends FieldValues> extends CoreInputElementGroup<T> {
  /**
   * The input element's type.
   */
  readonly type: string;
}

/**
 * Defines the properties of password-type input form elements
 * that extend the {@link CoreFormElementValidation} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
export interface PasswordInputElementGroup<T extends FieldValues> extends CoreInputElementGroup<T> {}

/**
 * Defines the properties of select form elements
 * that extend the {@link CoreFormElementValidation} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 * @template U - The type of options available in the select element.
 */
export interface CoreSelectElementGroup<T extends FieldValues, U> extends CoreFormElementGroup<T> {
  /**
   * An array of options available for selection in the select element.
   */
  readonly options: Array<U>;
}

/**
 * Defines the properties of general-purpose textarea form elements
 * that extend the {@link CoreFormElementValidation} properties and utilize the `react-hook-form` features.
 *
 * @template T - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
export interface TextareaElementGroup<T extends FieldValues> extends CoreFormElementGroup<T> {
  /**
   * The displayed label alongside the input element.
   */
  readonly label: string;

  /**
   * Placeholder text to guide the user on what to enter in the input element.
   */
  readonly placeholder: string;
}
