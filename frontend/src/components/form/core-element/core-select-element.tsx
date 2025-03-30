/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { type VariantProps, cva } from 'class-variance-authority';
import { JSX, ReactNode, SelectHTMLAttributes } from 'react';
import { FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

const coreSelectElementVariants = cva(joinTw('w-[95%] sm:w-[65%] h-20 px-4 text-xl border-2 rounded-xl', 'focus:outline-1'), {
  variants: {
    intent: {
      light: 'bg-primary border-secondary focus:placeholder:text-secondary-muted focus:outline-secondary',
    },
    isDisabled: {
      false: 'cursor-pointer',
      true: 'cursor-not-allowed',
    },
    isError: {
      true: 'border-destructive focus:outline-destructive',
    },
  },
});

/**
 * Defines the component's properties.
 */
interface CoreSelectElementProps<T extends FieldValues>
  extends VariantProps<typeof coreSelectElementVariants>,
    SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Optional validation rules to handle the select element's validation using the `react-hook-form` library for validation management.
   */
  readonly validationRules: RegisterOptions<FieldValues, Path<T>> | undefined;

  /**
   * The select element's id.
   */
  readonly id: Path<T>;

  /**
   * The select element's initial value.
   */
  readonly initialValue?: string | number;

  /**
   * The array of option values.
   */
  readonly options: Array<ReactNode>;

  /**
   * The select element's default option. The value is non-selectable and acts as a placeholder value.
   */
  readonly defaultOption: string;

  /**
   * Indicates whether the select element is disabled.
   */
  readonly isDisabled: boolean;

  /**
   * Indicates whether there is an error involving the select element.
   */
  readonly isError: boolean;

  /**
   * Additional optional styling options.
   */
  readonly className?: string;
}

/**
 * Renders the core select element used throughout the application.
 *
 * @param {CoreSelectElementProps} props
 * @return {JSX.Element}
 */
export const CoreSelectElement = <T extends FieldValues>({
  validationRules,
  id,
  initialValue,
  isDisabled,
  isError,
  options,
  defaultOption,
  intent,
  className,
}: CoreSelectElementProps<T>): JSX.Element => {
  const { register } = useFormContext();

  return (
    <select
      {...register(id, validationRules)}
      id={id}
      name={id}
      defaultValue={initialValue ?? ''}
      disabled={isDisabled}
      className={joinTw(coreSelectElementVariants({ intent, isDisabled, isError, className }))}
    >
      <option
        hidden
        value={''}
      >
        {defaultOption}
      </option>
      {options}
    </select>
  );
};
