/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { ChangeEvent, ReactNode } from 'react';
import { FieldValues, Path } from 'react-hook-form';

/* interface, type imports */
import {
  CoreInputElementVariantIntent,
  CoreSelectElementVariantIntent,
  CoreTextareaElementVariantIntent,
} from '@daigaku/components/common/form';

/**
 * Defines the properties of core form elements
 * that extend the {@link CoreFormElementValidation} properties and use the `react-hook-form` features.
 *
 * @template TFormValues - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
interface CoreFormElementGroup<TFormValues extends FieldValues> {
  /**
   * The input element's id.
   */
  readonly id: Path<TFormValues>;

  /**
   * Indicates whether the input is disabled, preventing user interaction.
   */
  readonly isDisabled: boolean;

  /**
   * The initial value for the input element.
   */
  readonly initialValue?: string | number;

  /**
   * The input element's style intent.
   */
  readonly intent: CoreInputElementVariantIntent | CoreSelectElementVariantIntent | CoreTextareaElementVariantIntent;
}

/**
 * Defines the properties of input form elements
 * that extend the {@link CoreFormElementValidation} properties and use the `react-hook-form` features.
 *
 * @template TFormValues - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
interface CoreInputElementGroup<TFormValues extends FieldValues> extends CoreFormElementGroup<TFormValues> {
  /**
   * The displayed label alongside the input element.
   */
  readonly label: string;

  /**
   * Placeholder text to guide the user on what to type in the input element.
   * Optional as certain input elements might have pre-filled data.
   */
  readonly placeholder?: string;
}

/**
 * Defines the properties of general-purpose input form elements
 * that extend the {@link CoreFormElementValidation} properties and use the `react-hook-form` features.
 *
 * @template TFormValues - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
export interface CommonInputElementGroup<TFormValues extends FieldValues> extends CoreInputElementGroup<TFormValues> {
  /**
   * The input element's type.
   */
  readonly type: string;
}

/**
 * Defines the properties of password-type input form elements
 * that extend the {@link CoreFormElementValidation} properties and use the `react-hook-form` features.
 *
 * @template TFormValues - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
export interface PasswordInputElementGroup<TFormValues extends FieldValues>
  extends CoreInputElementGroup<TFormValues> {}

/**
 *
 */
export interface CoreStaticSelectElementGroup<TFormValues extends FieldValues>
  extends CoreFormElementGroup<TFormValues> {
  /**
   * An array of options available for selection in the select element.
   */
  readonly options: ReactNode;

  /**
   *
   */
  readonly label: string;

  /**
   *
   */
  readonly initialValue: string;

  /**
   *
   */
  onChangeHandler?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Defines the properties of select form elements
 * that extend the {@link CoreFormElementValidation} properties and use the `react-hook-form` features.
 *
 * @template TFormValues - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 * @template U - The type of options available in the select element.
 */
export interface CoreSelectElementGroup<TFormValues extends FieldValues>
  extends CoreStaticSelectElementGroup<TFormValues> {
  /**
   *
   */
  readonly isLoading: boolean;

  /**
   *
   */
  readonly isFetchError: boolean;

  /**
   *
   */
  onRetry: () => void;
}

/**
 * Defines the properties of general-purpose textarea form elements
 * that extend the {@link CoreFormElementValidation} properties and use the `react-hook-form` features.
 *
 * @template TFormValues - A generic type parameter extending {@link https://react-hook-form.com/ts#FieldValues FieldValues}
 * from the `react-hook-form` library.
 */
export interface TextareaElementGroup<TFormValues extends FieldValues> extends CoreFormElementGroup<TFormValues> {
  /**
   * The displayed label alongside the input element.
   */
  readonly label: string;

  /**
   * Placeholder text to guide the user on what to type in the input element.
   */
  readonly placeholder: string;
}
